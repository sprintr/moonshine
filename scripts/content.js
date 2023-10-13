// https://www.onlinewebfonts.com/icon/481639

(() => {
	// TAG for logging
	// const TAG = 'moonshine';

	// ID of the container which will be injected with the iframe.
	const CONTAINER_ID = '#player';

	// Default width
	const DEFAULT_WIDTH = 900;

	// Default height
	const DEFAULT_HEIGHT = 506;

	/**
	 * Returns the id of the video
	 *
	 * @param {String} videoUrl
	 * @returns {String}
	 */
	const getVideoId = (videoUrl) => {
		if (!videoUrl) {
			return null;
		}

		const searchParams = new URL(videoUrl).searchParams;
		if (!searchParams) {
			return null;
		}

		return searchParams.get('v');
	};

	/**
	 * Injects a video in the player
	 *
	 * @param {String} videoUrl
	 */
	const injectIFrameVideo = (videoUrl) => {
		const videoId = getVideoId(videoUrl);
		if (!videoId) {
			return;
		}

		const container = document.querySelector(CONTAINER_ID);
		if (!container) {
			return;
		}

		// Create an IFrame element for the video.
		const iframe = document.createElement('iframe');
		iframe.src = `https://www.youtube.com/embed/${videoId}`;
		iframe.title = 'Viva La Resistance';
		iframe.width = container?.clientWidth ?? DEFAULT_WIDTH;
		iframe.height = container?.clientHeight ?? DEFAULT_HEIGHT;

		// Replace the children of the container with the video iframe.
		container.replaceChildren(iframe);
	}

	/**
	 * Attach an onclick listener to each video link on the page.
	 */
	const resetVideoLinks = () => {
		Array.from(document.querySelectorAll(".yt-simple-endpoint")).filter(endpoint => {
			if (!endpoint.href) {
				return false;
			}

			const videoId = getVideoId(endpoint.href);
			if (!videoId) {
				return false;
			}

			return true;
		}).forEach(endpoint => {
			endpoint.onclick = () => {
				injectIFrameVideo(endpoint.href);
			};
		});
	};

	const afterContentLoaded = () => {
		injectIFrameVideo(document.URL);
		resetVideoLinks();
	};

	if (document.readyState !== 'complete') {
		window.addEventListener('load', afterContentLoaded, false);
	} else {
		setTimeout(afterContentLoaded, 200);
	}
})();
