# Wellington Street Scans

This is a static site that can be hosted on GitHub Pages. Configure Pages to
deploy from the desired branch and repository root. All links and assets are
relative, so it also works under a GitHub Pages project path.

To preview locally, serve the repository over HTTP, for example:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/`. Opening the HTML file directly may prevent the
browser from loading the gallery data.

The gallery reads `scans.json`. To add or edit scans, update that file and put
the corresponding images in `imgs/`; image paths are case-sensitive. The
original `database.sqlite` is retained as an archive and is not read by the
site. The navigation background currently selects from scans 0 through 73.
