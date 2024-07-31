class Cloudflare {
  constructor(private readonly apiToken: string) {}

  private makeRequest(url: string, options?: RequestInit) {
    options ??= {};
    options.headers ??= {};
    (options.headers as Record<string, string>)["user-agent"] =
      "CloudflareDDNS/1.0 (made with <3 by jluims)";
    (options.headers as Record<string, string>)["authorization"] =
      "Bearer " + this.apiToken;

    return fetch(url, options);
  }

  async updateRecord(zoneId: string, id: string, name: string, ip: string) {
    const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${id}`;
    const params = new URLSearchParams({
      identifier: id,
      zone_identifier: zoneId,
    });

    const res = await this.makeRequest(`${url}?${params.toString()}`, {
      method: "PATCH",
      body: JSON.stringify({
        type: "A",
        name,
        content: ip,
      }),
    });

    if (!res.ok) {
      const errors = (await res.json())["errors"];
      throw new Error(JSON.stringify(errors));
    }
  }
}

export { Cloudflare };
