module.exports = {
    "main": {
        "themeName": "cromwell-blog",
        "title": "Blog",
        "previewImage": "/themes/cromwell-blog/blog.png",
        "description": "Simple blog website",
        "palette": {
            "primaryColor": "#9900CC"
        },
        "globalCss": [
            "react-toastify/dist/ReactToastify.css"
        ],
        "headHtml": "<link href=\"https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700;900&display=swap\" rel=\"stylesheet\" /><link href=\"https://unpkg.com/reset-css/reset.css\" rel=\"stylesheet\" /><meta name=\"viewport\" content=\"width=device-width\"><meta property=\"og:appConfig_headHtml\" content=\"blah_blah\" key=\"blah_blah\" />"
    },
    "pages": [
        {
            "route": "index",
            "name": "index",
            "title": "Home page",
            "modifications": []
        }
    ],
    "plugins": {
        "ProductShowcase": {
            "options": {}
        },
        "ProductShowcaseDemo": {
            "options": {}
        }
    }
}