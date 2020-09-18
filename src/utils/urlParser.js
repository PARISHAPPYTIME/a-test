export default () => {
	return {
		url: window.location.href,
		data: function (a, b) {
			var aVal = this.queryString(a, this.url)
			if (!b && b !== "") {
				return aVal
			}
			if (b === "") {
				this.url = this.url
					.replace("&" + a + "=" + aVal, b)
					.replace(a + "=" + aVal, b)
			}

			if (!!b) {
				if (aVal) {
					this.url = this.url
						.replace("&" + a + "=" + aVal, "&" + a + "=" + b)
						.replace(a + "=" + aVal, a + "=" + b)
				}
				if (!aVal) {
					this.url =
						this.url.indexOf("?") !== -1
							? this.url + "&" + a + "=" + b
							: this.url + "?" + a + "=" + b
					this.url = this.url.replace("?&", "?")
				}
			}
		},
		queryString: function (key, href) {
			href = href === undefined ? window.location.search : href
			var m = new RegExp("(?:&|/?)" + key + "=([^&$]+)").exec(href)
			return m ? m[1] : ""
		},
	}
}
