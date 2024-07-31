# CloudflareDDNS

Easy-to-use DDNS (Dynamic DNS) server written in JavaScript using the Node.JS runtime.

If you use Cloudflare to point your domain to your dynamic IP, you can use this and configure your router to automatically update Cloudflare DNS entires using the Cloudflare API.

## Building

Run `yarn install` to install dependencies.

Run `yarn build` to build the program. The transpiled code is available in `./dist/`

## Configuration

Rename `config.json.sample` to `config.json` and replace placeholder options.

Set `server.username` and `server.password` to whatever you want; make sure you use a strong password. This software uses `Basic` authentication for simplicity.

Follow [these instructions](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) to create a Cloudflare API token and paste it in the `api_token` field

For the `zone_id` field and `records` array, you can go to your domain's DNS records cloudflare page, open Chrome/Firefox DevTools, reload the page, and find a request to "https://dash.cloudflare.com/api/v4/zones/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/dns_records". Open the URL in a new tab and you'll see a JSON response.

Grab the `zone_id` from any of these JSON objects and replace it into the config. You can also copy the `id` and `name` fields into the records array to add DNS records that'll get modified.

## Usage

Run `node .` in your `dist` folder after building. I would recommend using a systemd service to handle running and restarting this program.

## Contribution

Contributions are welcome. Create an issue or pull request to add features, fix bugs, report problems, etc.
