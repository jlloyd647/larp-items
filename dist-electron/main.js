import { app as p, BrowserWindow as O, ipcMain as T } from "electron";
import g from "path";
import { fileURLToPath as j } from "url";
import N from "fs";
import W from "os";
import C from "crypto";
function B(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default") ? l.default : l;
}
var f = { exports: {} };
const q = "16.4.7", J = {
  version: q
};
var R;
function G() {
  if (R) return f.exports;
  R = 1;
  const l = N, d = g, E = W, V = C, h = J.version, I = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
  function D(e) {
    const r = {};
    let n = e.toString();
    n = n.replace(/\r\n?/mg, `
`);
    let s;
    for (; (s = I.exec(n)) != null; ) {
      const i = s[1];
      let t = s[2] || "";
      t = t.trim();
      const o = t[0];
      t = t.replace(/^(['"`])([\s\S]*)\1$/mg, "$2"), o === '"' && (t = t.replace(/\\n/g, `
`), t = t.replace(/\\r/g, "\r")), r[i] = t;
    }
    return r;
  }
  function x(e) {
    const r = A(e), n = c.configDotenv({ path: r });
    if (!n.parsed) {
      const o = new Error(`MISSING_DATA: Cannot parse ${r} for an unknown reason`);
      throw o.code = "MISSING_DATA", o;
    }
    const s = $(e).split(","), i = s.length;
    let t;
    for (let o = 0; o < i; o++)
      try {
        const a = s[o].trim(), u = K(n, a);
        t = c.decrypt(u.ciphertext, u.key);
        break;
      } catch (a) {
        if (o + 1 >= i)
          throw a;
      }
    return c.parse(t);
  }
  function k(e) {
    console.log(`[dotenv@${h}][INFO] ${e}`);
  }
  function L(e) {
    console.log(`[dotenv@${h}][WARN] ${e}`);
  }
  function w(e) {
    console.log(`[dotenv@${h}][DEBUG] ${e}`);
  }
  function $(e) {
    return e && e.DOTENV_KEY && e.DOTENV_KEY.length > 0 ? e.DOTENV_KEY : process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0 ? process.env.DOTENV_KEY : "";
  }
  function K(e, r) {
    let n;
    try {
      n = new URL(r);
    } catch (a) {
      if (a.code === "ERR_INVALID_URL") {
        const u = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
        throw u.code = "INVALID_DOTENV_KEY", u;
      }
      throw a;
    }
    const s = n.password;
    if (!s) {
      const a = new Error("INVALID_DOTENV_KEY: Missing key part");
      throw a.code = "INVALID_DOTENV_KEY", a;
    }
    const i = n.searchParams.get("environment");
    if (!i) {
      const a = new Error("INVALID_DOTENV_KEY: Missing environment part");
      throw a.code = "INVALID_DOTENV_KEY", a;
    }
    const t = `DOTENV_VAULT_${i.toUpperCase()}`, o = e.parsed[t];
    if (!o) {
      const a = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${t} in your .env.vault file.`);
      throw a.code = "NOT_FOUND_DOTENV_ENVIRONMENT", a;
    }
    return { ciphertext: o, key: s };
  }
  function A(e) {
    let r = null;
    if (e && e.path && e.path.length > 0)
      if (Array.isArray(e.path))
        for (const n of e.path)
          l.existsSync(n) && (r = n.endsWith(".vault") ? n : `${n}.vault`);
      else
        r = e.path.endsWith(".vault") ? e.path : `${e.path}.vault`;
    else
      r = d.resolve(process.cwd(), ".env.vault");
    return l.existsSync(r) ? r : null;
  }
  function b(e) {
    return e[0] === "~" ? d.join(E.homedir(), e.slice(1)) : e;
  }
  function Y(e) {
    k("Loading env from encrypted .env.vault");
    const r = c._parseVault(e);
    let n = process.env;
    return e && e.processEnv != null && (n = e.processEnv), c.populate(n, r, e), { parsed: r };
  }
  function F(e) {
    const r = d.resolve(process.cwd(), ".env");
    let n = "utf8";
    const s = !!(e && e.debug);
    e && e.encoding ? n = e.encoding : s && w("No encoding is specified. UTF-8 is used by default");
    let i = [r];
    if (e && e.path)
      if (!Array.isArray(e.path))
        i = [b(e.path)];
      else {
        i = [];
        for (const u of e.path)
          i.push(b(u));
      }
    let t;
    const o = {};
    for (const u of i)
      try {
        const v = c.parse(l.readFileSync(u, { encoding: n }));
        c.populate(o, v, e);
      } catch (v) {
        s && w(`Failed to load ${u} ${v.message}`), t = v;
      }
    let a = process.env;
    return e && e.processEnv != null && (a = e.processEnv), c.populate(a, o, e), t ? { parsed: o, error: t } : { parsed: o };
  }
  function P(e) {
    if ($(e).length === 0)
      return c.configDotenv(e);
    const r = A(e);
    return r ? c._configVault(e) : (L(`You set DOTENV_KEY but you are missing a .env.vault file at ${r}. Did you forget to build it?`), c.configDotenv(e));
  }
  function U(e, r) {
    const n = Buffer.from(r.slice(-64), "hex");
    let s = Buffer.from(e, "base64");
    const i = s.subarray(0, 12), t = s.subarray(-16);
    s = s.subarray(12, -16);
    try {
      const o = V.createDecipheriv("aes-256-gcm", n, i);
      return o.setAuthTag(t), `${o.update(s)}${o.final()}`;
    } catch (o) {
      const a = o instanceof RangeError, u = o.message === "Invalid key length", v = o.message === "Unsupported state or unable to authenticate data";
      if (a || u) {
        const _ = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
        throw _.code = "INVALID_DOTENV_KEY", _;
      } else if (v) {
        const _ = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
        throw _.code = "DECRYPTION_FAILED", _;
      } else
        throw o;
    }
  }
  function M(e, r, n = {}) {
    const s = !!(n && n.debug), i = !!(n && n.override);
    if (typeof r != "object") {
      const t = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
      throw t.code = "OBJECT_REQUIRED", t;
    }
    for (const t of Object.keys(r))
      Object.prototype.hasOwnProperty.call(e, t) ? (i === !0 && (e[t] = r[t]), s && w(i === !0 ? `"${t}" is already defined and WAS overwritten` : `"${t}" is already defined and was NOT overwritten`)) : e[t] = r[t];
  }
  const c = {
    configDotenv: F,
    _configVault: Y,
    _parseVault: x,
    config: P,
    decrypt: U,
    parse: D,
    populate: M
  };
  return f.exports.configDotenv = c.configDotenv, f.exports._configVault = c._configVault, f.exports._parseVault = c._parseVault, f.exports.config = c.config, f.exports.decrypt = c.decrypt, f.exports.parse = c.parse, f.exports.populate = c.populate, f.exports = c, f.exports;
}
var Q = G();
const z = /* @__PURE__ */ B(Q), H = j(import.meta.url), X = g.dirname(H);
process.platform === "win32" && p.setAppUserModelId(p.getName());
const Z = p.requestSingleInstanceLock();
Z || (p.quit(), process.exit(0));
let y = null;
async function S() {
  y = new O({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: g.join(X, "preload.js"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), process.env.VITE_DEV_SERVER_URL ? (await y.loadURL(process.env.VITE_DEV_SERVER_URL), y.webContents.openDevTools()) : y.loadFile(g.join(process.env.DIST || "dist", "index.html"));
}
p.whenReady().then(S);
p.on("window-all-closed", () => {
  process.platform !== "darwin" && p.quit();
});
p.on("activate", () => {
  O.getAllWindows().length === 0 && S();
});
z.config();
const ee = process.env.ADMIN_PASSWORD;
T.on("print-character-card", () => {
  const l = O.getFocusedWindow();
  l && l.webContents.print({
    silent: !0,
    printBackground: !0,
    landscape: !0,
    margins: { marginType: "none" },
    // 👈 required
    pageSize: {
      width: 148e3,
      // 148mm in microns
      height: 105e3
      // 105mm
    }
  }, (d, E) => {
    d || console.error("Failed to print character card:", E);
  });
});
T.on("write-crafting-log", (l, d) => {
  const E = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), V = g.dirname(process.execPath), m = g.join(V, "log");
  N.existsSync(m) || N.mkdirSync(m, { recursive: !0 });
  const h = g.join(m, `${E}_craft_log.txt`);
  console.log("Crafting log will be saved to:", h);
  const I = JSON.stringify(d) + `
`;
  N.appendFile(h, I, "utf8", (D) => {
    D && console.error("Failed to write crafting log:", D);
  });
});
T.handle("check-admin-password", (l, d) => d === ee);
