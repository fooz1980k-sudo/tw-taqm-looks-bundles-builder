"""Render every [data-shot] element of demo/index.html at desktop 1440x900 and mobile 390x844 into shots/."""
import sys, os, http.server, threading, functools, json
from playwright.sync_api import sync_playwright
root = sys.argv[1]; os.makedirs(f"{root}/shots", exist_ok=True)
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Q, directory=root)); port = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()
errs = []; done = []
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
    for w, h, tag in [(1440, 900, "d"), (390, 844, "m")]:
        for lang in (["ar", "en"] if tag == "d" else ["ar"]):
            pg = b.new_page(viewport={"width": w, "height": h}, device_scale_factor=1 if tag == "d" else 2, is_mobile=(tag == "m"), has_touch=(tag == "m"),
                            user_agent=None if tag == "d" else "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1")
            pg.on("pageerror", lambda e: errs.append(str(e)))
            pg.on("console", lambda m: m.type == "error" and errs.append(m.text))
            pg.goto(f"http://127.0.0.1:{port}/demo/index.html?lang={lang}&utm_source=snapchat")
            pg.wait_for_function("window.__ready === true", timeout=20000); pg.wait_for_timeout(2500)
            for el in pg.query_selector_all("[data-shot]"):
                name = el.get_attribute("data-shot"); el.scroll_into_view_if_needed(); pg.wait_for_timeout(600)
                act = el.get_attribute("data-act")
                if act: pg.evaluate(f"window.__act && window.__act[{json.dumps(act)}] && window.__act[{json.dumps(act)}]()"); pg.wait_for_timeout(1400)
                sfx = "" if lang == "ar" else "-en"
                path = f"{root}/shots/{tag}-{name}{sfx}.png"; el.screenshot(path=path); done.append(path)
            pg.close()
    b.close()
srv.shutdown()
print(json.dumps({"shots": len(done), "errors": sorted(set(errs))[:20]}, ensure_ascii=False))
