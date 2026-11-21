/**
 * Each project's latest published version, read from its registries when
 * the site builds (the Pages workflow builds daily). A registry that does
 * not answer leaves that version out; it never fails the build.
 */

const UA = 'oss.pulzr.net site build (https://github.com/pulzar-net/pulzar-net.github.io)';

async function json(url, headers = {}) {
	try {
		const res = await fetch(url, {
			headers: { 'user-agent': UA, accept: 'application/json', ...headers },
			signal: AbortSignal.timeout(10_000),
		});
		return res.ok ? await res.json() : null;
	} catch {
		return null;
	}
}

const github = process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {};

/** @param {{ registry: string, name?: string }} pkg @param {string} repo */
async function latest(pkg, repo) {
	switch (pkg.registry) {
		case 'crates': {
			const j = await json(`https://crates.io/api/v1/crates/${pkg.name}`);
			const version = j?.crate?.max_stable_version ?? j?.crate?.max_version;
			return version && { version, url: `https://crates.io/crates/${pkg.name}` };
		}
		case 'npm': {
			const j = await json(`https://registry.npmjs.org/${pkg.name}/latest`);
			return j?.version && { version: j.version, url: `https://www.npmjs.com/package/${pkg.name}` };
		}
		case 'pypi': {
			const j = await json(`https://pypi.org/pypi/${pkg.name}/json`);
			return j?.info?.version && { version: j.info.version, url: `https://pypi.org/project/${pkg.name}/` };
		}
		case 'github': {
			const j = await json(`https://api.github.com/repos/pulzar-net/${repo}/releases/latest`, github);
			// Tags like v1.2.0, or zhc-26.135.0 (a catalog named for its upstream).
			return j?.tag_name && { version: j.tag_name.replace(/^(v|[a-z-]+-(?=\d))/, ''), url: j.html_url };
		}
	}
	return null;
}

/**
 * @param {{ id: string, packages?: { registry: string, name?: string }[] }[]} projects
 * @returns {Promise<Map<string, { registry: string, name?: string, version: string, url: string }[]>>}
 */
export async function releases(projects) {
	const out = new Map();
	await Promise.all(
		projects.map(async (p) => {
			const found = await Promise.all((p.packages ?? []).map(async (pkg) => {
				const r = await latest(pkg, p.id);
				return r ? { ...pkg, ...r } : null;
			}));
			out.set(p.id, found.filter(Boolean));
		}),
	);
	return out;
}
