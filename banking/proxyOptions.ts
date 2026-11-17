import { readFileSync } from 'node:fs';

let webserver_port = 8000; // Default port for testing

try {
	const common_site_config = JSON.parse(
		readFileSync(new URL('../../../sites/common_site_config.json', import.meta.url), 'utf8')
	) as { webserver_port: string | number };
	webserver_port = common_site_config.webserver_port;
} catch (error) {
	// Config file not found, using default port (useful for testing)
}

export default {
	'^/(app|api|assets|files|private)': {
		target: `http://127.0.0.1:${webserver_port}`,
		ws: true,
		router: function (req) {
			const site_name = req.headers?.host?.split(':')[0];
			return `http://${site_name ?? 'localhost'}:${webserver_port}`;
		}
	}
};
