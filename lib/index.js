import { createRequire as ct } from "node:module";
const G = ct(import.meta.url);
var at = {
  /***/
  323(l, O, n) {
    const e = n(916);
    const i = n(928);
    const s = n(965).mkdirsSync;
    const y = n(490).utimesMillisSync;
    const w = n(619);
    function m(f, p, x) {
      if (typeof x === "function") {
        x = { filter: x };
      }
      x = x || {};
      x.clobber = "clobber" in x ? !!x.clobber : true;
      x.overwrite = "overwrite" in x ? !!x.overwrite : x.clobber;
      if (x.preserveTimestamps && process.arch === "ia32") {
        process.emitWarning(
          "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269",
          "Warning",
          "fs-extra-WARN0002"
        );
      }
      const { srcStat: k, destStat: b } = w.checkPathsSync(f, p, "copy", x);
      w.checkParentPathsSync(f, k, p, "copy");
      if (x.filter && !x.filter(f, p)) return;
      const C = i.dirname(p);
      if (!e.existsSync(C)) s(C);
      return r(b, f, p, x);
    }
    function r(f, p, x, k) {
      const b = k.dereference ? e.statSync : e.lstatSync;
      const C = b(p);
      if (C.isDirectory()) return D(C, f, p, x, k);
      else if (C.isFile() || C.isCharacterDevice() || C.isBlockDevice()) return P(C, f, p, x, k);
      else if (C.isSymbolicLink()) return d(f, p, x, k);
      else if (C.isSocket()) throw new Error(`Cannot copy a socket file: ${p}`);
      else if (C.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${p}`);
      throw new Error(`Unknown file: ${p}`);
    }
    function P(f, p, x, k, b) {
      if (!p) return S(f, x, k, b);
      return E(f, x, k, b);
    }
    function E(f, p, x, k) {
      if (k.overwrite) {
        e.unlinkSync(x);
        return S(f, p, x, k);
      } else if (k.errorOnExist) {
        throw new Error(`'${x}' already exists`);
      }
    }
    function S(f, p, x, k) {
      e.copyFileSync(p, x);
      if (k.preserveTimestamps) F(f.mode, p, x);
      return a(x, f.mode);
    }
    function F(f, p, x) {
      if (h(f)) u(x, f);
      return g(p, x);
    }
    function h(f) {
      return (f & 128) === 0;
    }
    function u(f, p) {
      return a(f, p | 128);
    }
    function a(f, p) {
      return e.chmodSync(f, p);
    }
    function g(f, p) {
      const x = e.statSync(f);
      return y(p, x.atime, x.mtime);
    }
    function D(f, p, x, k, b) {
      if (!p) return t(f.mode, x, k, b);
      return o(x, k, b);
    }
    function t(f, p, x, k) {
      e.mkdirSync(x);
      o(p, x, k);
      return a(x, f);
    }
    function o(f, p, x) {
      const k = e.opendirSync(f);
      try {
        let b;
        while ((b = k.readSync()) !== null) {
          c(b.name, f, p, x);
        }
      } finally {
        k.closeSync();
      }
    }
    function c(f, p, x, k) {
      const b = i.join(p, f);
      const C = i.join(x, f);
      if (k.filter && !k.filter(b, C)) return;
      const { destStat: Y } = w.checkPathsSync(b, C, "copy", k);
      return r(Y, b, C, k);
    }
    function d(f, p, x, k) {
      let b = e.readlinkSync(p);
      if (k.dereference) {
        b = i.resolve(process.cwd(), b);
      }
      if (!f) {
        return e.symlinkSync(b, x);
      } else {
        let C;
        try {
          C = e.readlinkSync(x);
        } catch (Y) {
          if (Y.code === "EINVAL" || Y.code === "UNKNOWN") return e.symlinkSync(b, x);
          throw Y;
        }
        if (k.dereference) {
          C = i.resolve(process.cwd(), C);
        }
        if (b !== C) {
          if (w.isSrcSubdir(b, C)) {
            throw new Error(`Cannot copy '${b}' to a subdirectory of itself, '${C}'.`);
          }
          if (w.isSrcSubdir(C, b)) {
            throw new Error(`Cannot overwrite '${C}' with '${b}'.`);
          }
        }
        return v(b, x);
      }
    }
    function v(f, p) {
      e.unlinkSync(p);
      return e.symlinkSync(f, p);
    }
    l.exports = m;
  },
  /***/
  315(l, O, n) {
    const e = n(982);
    const i = n(928);
    const { mkdirs: s } = n(965);
    const { pathExists: y } = n(709);
    const { utimesMillis: w } = n(490);
    const m = n(619);
    const { asyncIteratorConcurrentProcess: r } = n(629);
    async function P(t, o, c = {}) {
      if (typeof c === "function") {
        c = { filter: c };
      }
      c.clobber = "clobber" in c ? !!c.clobber : true;
      c.overwrite = "overwrite" in c ? !!c.overwrite : c.clobber;
      if (c.preserveTimestamps && process.arch === "ia32") {
        process.emitWarning(
          "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269",
          "Warning",
          "fs-extra-WARN0001"
        );
      }
      const { srcStat: d, destStat: v } = await m.checkPaths(t, o, "copy", c);
      await m.checkParentPaths(t, d, o, "copy");
      const f = await E(t, o, c);
      if (!f) return;
      const p = i.dirname(o);
      const x = await y(p);
      if (!x) {
        await s(p);
      }
      await S(v, t, o, c);
    }
    async function E(t, o, c) {
      if (!c.filter) return true;
      return c.filter(t, o);
    }
    async function S(t, o, c, d) {
      const v = d.dereference ? e.stat : e.lstat;
      const f = await v(o);
      if (f.isDirectory()) return g(f, t, o, c, d);
      if (f.isFile() || f.isCharacterDevice() || f.isBlockDevice()) return F(f, t, o, c, d);
      if (f.isSymbolicLink()) return D(t, o, c, d);
      if (f.isSocket()) throw new Error(`Cannot copy a socket file: ${o}`);
      if (f.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${o}`);
      throw new Error(`Unknown file: ${o}`);
    }
    async function F(t, o, c, d, v) {
      if (!o) return h(t, c, d, v);
      if (v.overwrite) {
        await e.unlink(d);
        return h(t, c, d, v);
      }
      if (v.errorOnExist) {
        throw new Error(`'${d}' already exists`);
      }
    }
    async function h(t, o, c, d) {
      await e.copyFile(o, c);
      if (d.preserveTimestamps) {
        if (u(t.mode)) {
          await a(c, t.mode);
        }
        const v = await e.stat(o);
        await w(c, v.atime, v.mtime);
      }
      return e.chmod(c, t.mode);
    }
    function u(t) {
      return (t & 128) === 0;
    }
    function a(t, o) {
      return e.chmod(t, o | 128);
    }
    async function g(t, o, c, d, v) {
      if (!o) {
        await e.mkdir(d);
      }
      await r(await e.opendir(c), async (f) => {
        const p = i.join(c, f.name);
        const x = i.join(d, f.name);
        const k = await E(p, x, v);
        if (k) {
          const { destStat: b } = await m.checkPaths(p, x, "copy", v);
          await S(b, p, x, v);
        }
      });
      if (!o) {
        await e.chmod(d, t.mode);
      }
    }
    async function D(t, o, c, d) {
      let v = await e.readlink(o);
      if (d.dereference) {
        v = i.resolve(process.cwd(), v);
      }
      if (!t) {
        return e.symlink(v, c);
      }
      let f = null;
      try {
        f = await e.readlink(c);
      } catch (p) {
        if (p.code === "EINVAL" || p.code === "UNKNOWN") return e.symlink(v, c);
        throw p;
      }
      if (d.dereference) {
        f = i.resolve(process.cwd(), f);
      }
      if (v !== f) {
        if (m.isSrcSubdir(v, f)) {
          throw new Error(`Cannot copy '${v}' to a subdirectory of itself, '${f}'.`);
        }
        if (m.isSrcSubdir(f, v)) {
          throw new Error(`Cannot overwrite '${f}' with '${v}'.`);
        }
      }
      await e.unlink(c);
      return e.symlink(v, c);
    }
    l.exports = P;
  },
  /***/
  280(l, O, n) {
    const e = n(201).fromPromise;
    l.exports = {
      copy: e(n(315)),
      copySync: n(323)
    };
  },
  /***/
  870(l, O, n) {
    const e = n(201).fromPromise;
    const i = n(982);
    const s = n(928);
    const y = n(965);
    const w = n(257);
    const m = e(async function P(E) {
      let S;
      try {
        S = await i.readdir(E);
      } catch {
        return y.mkdirs(E);
      }
      return Promise.all(S.map((F) => w.remove(s.join(E, F))));
    });
    function r(P) {
      let E;
      try {
        E = i.readdirSync(P);
      } catch {
        return y.mkdirsSync(P);
      }
      E.forEach((S) => {
        S = s.join(P, S);
        w.removeSync(S);
      });
    }
    l.exports = {
      emptyDirSync: r,
      emptydirSync: r,
      emptyDir: m,
      emptydir: m
    };
  },
  /***/
  229(l, O, n) {
    const e = n(201).fromPromise;
    const i = n(928);
    const s = n(982);
    const y = n(965);
    async function w(r) {
      let P;
      try {
        P = await s.stat(r);
      } catch {
      }
      if (P && P.isFile()) return;
      const E = i.dirname(r);
      let S = null;
      try {
        S = await s.stat(E);
      } catch (F) {
        if (F.code === "ENOENT") {
          await y.mkdirs(E);
          await s.writeFile(r, "");
          return;
        } else {
          throw F;
        }
      }
      if (S.isDirectory()) {
        await s.writeFile(r, "");
      } else {
        await s.readdir(E);
      }
    }
    function m(r) {
      let P;
      try {
        P = s.statSync(r);
      } catch {
      }
      if (P && P.isFile()) return;
      const E = i.dirname(r);
      try {
        if (!s.statSync(E).isDirectory()) {
          s.readdirSync(E);
        }
      } catch (S) {
        if (S && S.code === "ENOENT") y.mkdirsSync(E);
        else throw S;
      }
      s.writeFileSync(r, "");
    }
    l.exports = {
      createFile: e(w),
      createFileSync: m
    };
  },
  /***/
  687(l, O, n) {
    const { createFile: e, createFileSync: i } = n(229);
    const { createLink: s, createLinkSync: y } = n(611);
    const { createSymlink: w, createSymlinkSync: m } = n(20);
    l.exports = {
      // file
      createFile: e,
      createFileSync: i,
      ensureFile: e,
      ensureFileSync: i,
      // link
      createLink: s,
      createLinkSync: y,
      ensureLink: s,
      ensureLinkSync: y,
      // symlink
      createSymlink: w,
      createSymlinkSync: m,
      ensureSymlink: w,
      ensureSymlinkSync: m
    };
  },
  /***/
  611(l, O, n) {
    const e = n(201).fromPromise;
    const i = n(928);
    const s = n(982);
    const y = n(965);
    const { pathExists: w } = n(709);
    const { areIdentical: m } = n(619);
    async function r(E, S) {
      let F;
      try {
        F = await s.lstat(S, { bigint: true });
      } catch {
      }
      let h;
      try {
        h = await s.lstat(E, { bigint: true });
      } catch (g) {
        g.message = g.message.replace("lstat", "ensureLink");
        throw g;
      }
      if (F && m(h, F)) return;
      const u = i.dirname(S);
      const a = await w(u);
      if (!a) {
        await y.mkdirs(u);
      }
      await s.link(E, S);
    }
    function P(E, S) {
      let F;
      try {
        F = s.lstatSync(S, { bigint: true });
      } catch {
      }
      try {
        const a = s.lstatSync(E, { bigint: true });
        if (F && m(a, F)) return;
      } catch (a) {
        a.message = a.message.replace("lstat", "ensureLink");
        throw a;
      }
      const h = i.dirname(S);
      const u = s.existsSync(h);
      if (u) return s.linkSync(E, S);
      y.mkdirsSync(h);
      return s.linkSync(E, S);
    }
    l.exports = {
      createLink: e(r),
      createLinkSync: P
    };
  },
  /***/
  141(l, O, n) {
    const e = n(928);
    const i = n(982);
    const { pathExists: s } = n(709);
    const y = n(201).fromPromise;
    async function w(r, P) {
      if (e.isAbsolute(r)) {
        try {
          await i.lstat(r);
        } catch (h) {
          h.message = h.message.replace("lstat", "ensureSymlink");
          throw h;
        }
        return {
          toCwd: r,
          toDst: r
        };
      }
      const E = e.dirname(P);
      const S = e.join(E, r);
      const F = await s(S);
      if (F) {
        return {
          toCwd: S,
          toDst: r
        };
      }
      try {
        await i.lstat(r);
      } catch (h) {
        h.message = h.message.replace("lstat", "ensureSymlink");
        throw h;
      }
      return {
        toCwd: r,
        toDst: e.relative(E, r)
      };
    }
    function m(r, P) {
      if (e.isAbsolute(r)) {
        const u = i.existsSync(r);
        if (!u) throw new Error("absolute srcpath does not exist");
        return {
          toCwd: r,
          toDst: r
        };
      }
      const E = e.dirname(P);
      const S = e.join(E, r);
      const F = i.existsSync(S);
      if (F) {
        return {
          toCwd: S,
          toDst: r
        };
      }
      const h = i.existsSync(r);
      if (!h) throw new Error("relative srcpath does not exist");
      return {
        toCwd: r,
        toDst: e.relative(E, r)
      };
    }
    l.exports = {
      symlinkPaths: y(w),
      symlinkPathsSync: m
    };
  },
  /***/
  633(l, O, n) {
    const e = n(982);
    const i = n(201).fromPromise;
    async function s(w, m) {
      if (m) return m;
      let r;
      try {
        r = await e.lstat(w);
      } catch {
        return "file";
      }
      return r && r.isDirectory() ? "dir" : "file";
    }
    function y(w, m) {
      if (m) return m;
      let r;
      try {
        r = e.lstatSync(w);
      } catch {
        return "file";
      }
      return r && r.isDirectory() ? "dir" : "file";
    }
    l.exports = {
      symlinkType: i(s),
      symlinkTypeSync: y
    };
  },
  /***/
  20(l, O, n) {
    const e = n(201).fromPromise;
    const i = n(928);
    const s = n(982);
    const { mkdirs: y, mkdirsSync: w } = n(965);
    const { symlinkPaths: m, symlinkPathsSync: r } = n(141);
    const { symlinkType: P, symlinkTypeSync: E } = n(633);
    const { pathExists: S } = n(709);
    const { areIdentical: F } = n(619);
    async function h(a, g, D) {
      let t;
      try {
        t = await s.lstat(g);
      } catch {
      }
      if (t && t.isSymbolicLink()) {
        let v;
        if (i.isAbsolute(a)) {
          v = await s.stat(a, { bigint: true });
        } else {
          const p = i.dirname(g);
          const x = i.join(p, a);
          try {
            v = await s.stat(x, { bigint: true });
          } catch {
            v = await s.stat(a, { bigint: true });
          }
        }
        let f;
        try {
          f = await s.stat(g, { bigint: true });
        } catch (p) {
          if (p.code !== "ENOENT") throw p;
        }
        if (f && F(v, f)) return;
      }
      const o = await m(a, g);
      a = o.toDst;
      const c = await P(o.toCwd, D);
      const d = i.dirname(g);
      if (!await S(d)) {
        await y(d);
      }
      return s.symlink(a, g, c);
    }
    function u(a, g, D) {
      let t;
      try {
        t = s.lstatSync(g);
      } catch {
      }
      if (t && t.isSymbolicLink()) {
        let v;
        if (i.isAbsolute(a)) {
          v = s.statSync(a, { bigint: true });
        } else {
          const p = i.dirname(g);
          const x = i.join(p, a);
          try {
            v = s.statSync(x, { bigint: true });
          } catch {
            v = s.statSync(a, { bigint: true });
          }
        }
        let f;
        try {
          f = s.statSync(g, { bigint: true });
        } catch (p) {
          if (p.code !== "ENOENT") throw p;
        }
        if (f && F(v, f)) return;
      }
      const o = r(a, g);
      a = o.toDst;
      D = E(o.toCwd, D);
      const c = i.dirname(g);
      const d = s.existsSync(c);
      if (d) return s.symlinkSync(a, g, D);
      w(c);
      return s.symlinkSync(a, g, D);
    }
    l.exports = {
      createSymlink: e(h),
      createSymlinkSync: u
    };
  },
  /***/
  982(l, O, n) {
    const e = n(201).fromCallback;
    const i = n(916);
    const s = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "cp",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "glob",
      "lchmod",
      "lchown",
      "lutimes",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "statfs",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((y) => {
      return typeof i[y] === "function";
    });
    Object.assign(O, i);
    s.forEach((y) => {
      O[y] = e(i[y]);
    });
    O.exists = function(y, w) {
      if (typeof w === "function") {
        return i.exists(y, w);
      }
      return new Promise((m) => {
        return i.exists(y, m);
      });
    };
    O.read = function(y, w, m, r, P, E) {
      if (typeof E === "function") {
        return i.read(y, w, m, r, P, E);
      }
      return new Promise((S, F) => {
        i.read(y, w, m, r, P, (h, u, a) => {
          if (h) return F(h);
          S({ bytesRead: u, buffer: a });
        });
      });
    };
    O.write = function(y, w, ...m) {
      if (typeof m[m.length - 1] === "function") {
        return i.write(y, w, ...m);
      }
      return new Promise((r, P) => {
        i.write(y, w, ...m, (E, S, F) => {
          if (E) return P(E);
          r({ bytesWritten: S, buffer: F });
        });
      });
    };
    O.readv = function(y, w, ...m) {
      if (typeof m[m.length - 1] === "function") {
        return i.readv(y, w, ...m);
      }
      return new Promise((r, P) => {
        i.readv(y, w, ...m, (E, S, F) => {
          if (E) return P(E);
          r({ bytesRead: S, buffers: F });
        });
      });
    };
    O.writev = function(y, w, ...m) {
      if (typeof m[m.length - 1] === "function") {
        return i.writev(y, w, ...m);
      }
      return new Promise((r, P) => {
        i.writev(y, w, ...m, (E, S, F) => {
          if (E) return P(E);
          r({ bytesWritten: S, buffers: F });
        });
      });
    };
    if (typeof i.realpath.native === "function") {
      O.realpath.native = e(i.realpath.native);
    } else {
      process.emitWarning(
        "fs.realpath.native is not a function. Is fs being monkey-patched?",
        "Warning",
        "fs-extra-WARN0003"
      );
    }
  },
  /***/
  804(l, O, n) {
    l.exports = {
      // Export promiseified graceful-fs:
      ...n(982),
      // Export extra methods:
      ...n(280),
      ...n(870),
      ...n(687),
      ...n(691),
      ...n(965),
      ...n(272),
      ...n(665),
      ...n(709),
      ...n(257)
    };
  },
  /***/
  691(l, O, n) {
    const e = n(201).fromPromise;
    const i = n(451);
    i.outputJson = e(n(954));
    i.outputJsonSync = n(373);
    i.outputJSON = i.outputJson;
    i.outputJSONSync = i.outputJsonSync;
    i.writeJSON = i.writeJson;
    i.writeJSONSync = i.writeJsonSync;
    i.readJSON = i.readJson;
    i.readJSONSync = i.readJsonSync;
    l.exports = i;
  },
  /***/
  451(l, O, n) {
    const e = n(759);
    l.exports = {
      // jsonfile exports
      readJson: e.readFile,
      readJsonSync: e.readFileSync,
      writeJson: e.writeFile,
      writeJsonSync: e.writeFileSync
    };
  },
  /***/
  373(l, O, n) {
    const { stringify: e } = n(733);
    const { outputFileSync: i } = n(665);
    function s(y, w, m) {
      const r = e(w, m);
      i(y, r, m);
    }
    l.exports = s;
  },
  /***/
  954(l, O, n) {
    const { stringify: e } = n(733);
    const { outputFile: i } = n(665);
    async function s(y, w, m = {}) {
      const r = e(w, m);
      await i(y, r, m);
    }
    l.exports = s;
  },
  /***/
  965(l, O, n) {
    const e = n(201).fromPromise;
    const { makeDir: i, makeDirSync: s } = n(541);
    const y = e(i);
    l.exports = {
      mkdirs: y,
      mkdirsSync: s,
      // alias
      mkdirp: y,
      mkdirpSync: s,
      ensureDir: y,
      ensureDirSync: s
    };
  },
  /***/
  541(l, O, n) {
    const e = n(982);
    const { checkPath: i } = n(712);
    const s = (y) => {
      const w = { mode: 511 };
      if (typeof y === "number") return y;
      return { ...w, ...y }.mode;
    };
    l.exports.makeDir = async (y, w) => {
      i(y);
      return e.mkdir(y, {
        mode: s(w),
        recursive: true
      });
    };
    l.exports.makeDirSync = (y, w) => {
      i(y);
      return e.mkdirSync(y, {
        mode: s(w),
        recursive: true
      });
    };
  },
  /***/
  712(l, O, n) {
    const e = n(928);
    l.exports.checkPath = function i(s) {
      if (process.platform === "win32") {
        const y = /[<>:"|?*]/.test(s.replace(e.parse(s).root, ""));
        if (y) {
          const w = new Error(`Path contains invalid characters: ${s}`);
          w.code = "EINVAL";
          throw w;
        }
      }
    };
  },
  /***/
  272(l, O, n) {
    const e = n(201).fromPromise;
    l.exports = {
      move: e(n(715)),
      moveSync: n(435)
    };
  },
  /***/
  435(l, O, n) {
    const e = n(916);
    const i = n(928);
    const s = n(280).copySync;
    const y = n(257).removeSync;
    const w = n(965).mkdirpSync;
    const m = n(619);
    function r(h, u, a) {
      a = a || {};
      const g = a.overwrite || a.clobber || false;
      const { srcStat: D, isChangingCase: t = false } = m.checkPathsSync(h, u, "move", a);
      m.checkParentPathsSync(h, D, u, "move");
      if (!P(u)) w(i.dirname(u));
      return E(h, u, g, t);
    }
    function P(h) {
      const u = i.dirname(h);
      const a = i.parse(u);
      return a.root === u;
    }
    function E(h, u, a, g) {
      if (g) return S(h, u, a);
      if (a) {
        y(u);
        return S(h, u, a);
      }
      if (e.existsSync(u)) throw new Error("dest already exists.");
      return S(h, u, a);
    }
    function S(h, u, a) {
      try {
        e.renameSync(h, u);
      } catch (g) {
        if (g.code !== "EXDEV") throw g;
        return F(h, u, a);
      }
    }
    function F(h, u, a) {
      const g = {
        overwrite: a,
        errorOnExist: true,
        preserveTimestamps: true
      };
      s(h, u, g);
      return y(h);
    }
    l.exports = r;
  },
  /***/
  715(l, O, n) {
    const e = n(982);
    const i = n(928);
    const { copy: s } = n(280);
    const { remove: y } = n(257);
    const { mkdirp: w } = n(965);
    const { pathExists: m } = n(709);
    const r = n(619);
    async function P(F, h, u = {}) {
      const a = u.overwrite || u.clobber || false;
      const { srcStat: g, isChangingCase: D = false } = await r.checkPaths(F, h, "move", u);
      await r.checkParentPaths(F, g, h, "move");
      const t = i.dirname(h);
      const o = i.parse(t);
      if (o.root !== t) {
        await w(t);
      }
      return E(F, h, a, D);
    }
    async function E(F, h, u, a) {
      if (!a) {
        if (u) {
          await y(h);
        } else if (await m(h)) {
          throw new Error("dest already exists.");
        }
      }
      try {
        await e.rename(F, h);
      } catch (g) {
        if (g.code !== "EXDEV") {
          throw g;
        }
        await S(F, h, u);
      }
    }
    async function S(F, h, u) {
      const a = {
        overwrite: u,
        errorOnExist: true,
        preserveTimestamps: true
      };
      await s(F, h, a);
      return y(F);
    }
    l.exports = P;
  },
  /***/
  665(l, O, n) {
    const e = n(201).fromPromise;
    const i = n(982);
    const s = n(928);
    const y = n(965);
    const w = n(709).pathExists;
    async function m(P, E, S = "utf-8") {
      const F = s.dirname(P);
      if (!await w(F)) {
        await y.mkdirs(F);
      }
      return i.writeFile(P, E, S);
    }
    function r(P, ...E) {
      const S = s.dirname(P);
      if (!i.existsSync(S)) {
        y.mkdirsSync(S);
      }
      i.writeFileSync(P, ...E);
    }
    l.exports = {
      outputFile: e(m),
      outputFileSync: r
    };
  },
  /***/
  709(l, O, n) {
    const e = n(201).fromPromise;
    const i = n(982);
    function s(y) {
      return i.access(y).then(() => true).catch(() => false);
    }
    l.exports = {
      pathExists: e(s),
      pathExistsSync: i.existsSync
    };
  },
  /***/
  257(l, O, n) {
    const e = n(916);
    const i = n(201).fromCallback;
    function s(w, m) {
      e.rm(w, { recursive: true, force: true }, m);
    }
    function y(w) {
      e.rmSync(w, { recursive: true, force: true });
    }
    l.exports = {
      remove: i(s),
      removeSync: y
    };
  },
  /***/
  629(l) {
    async function O(n, e) {
      const i = [];
      for await (const s of n) {
        i.push(
          e(s).then(
            () => null,
            (y) => y ?? new Error("unknown error")
          )
        );
      }
      await Promise.all(
        i.map(
          (s) => s.then((y) => {
            if (y !== null) throw y;
          })
        )
      );
    }
    l.exports = {
      asyncIteratorConcurrentProcess: O
    };
  },
  /***/
  619(l, O, n) {
    const e = n(982);
    const i = n(928);
    const s = n(201).fromPromise;
    function y(u, a, g) {
      const D = g.dereference ? (t) => e.stat(t, { bigint: true }) : (t) => e.lstat(t, { bigint: true });
      return Promise.all([
        D(u),
        D(a).catch((t) => {
          if (t.code === "ENOENT") return null;
          throw t;
        })
      ]).then(([t, o]) => ({ srcStat: t, destStat: o }));
    }
    function w(u, a, g) {
      let D;
      const t = g.dereference ? (c) => e.statSync(c, { bigint: true }) : (c) => e.lstatSync(c, { bigint: true });
      const o = t(u);
      try {
        D = t(a);
      } catch (c) {
        if (c.code === "ENOENT") return { srcStat: o, destStat: null };
        throw c;
      }
      return { srcStat: o, destStat: D };
    }
    async function m(u, a, g, D) {
      const { srcStat: t, destStat: o } = await y(u, a, D);
      if (o) {
        if (S(t, o)) {
          const c = i.basename(u);
          const d = i.basename(a);
          if (g === "move" && c !== d && c.toLowerCase() === d.toLowerCase()) {
            return { srcStat: t, destStat: o, isChangingCase: true };
          }
          throw new Error("Source and destination must not be the same.");
        }
        if (t.isDirectory() && !o.isDirectory()) {
          throw new Error(`Cannot overwrite non-directory '${a}' with directory '${u}'.`);
        }
        if (!t.isDirectory() && o.isDirectory()) {
          throw new Error(`Cannot overwrite directory '${a}' with non-directory '${u}'.`);
        }
      }
      if (t.isDirectory() && F(u, a)) {
        throw new Error(h(u, a, g));
      }
      return { srcStat: t, destStat: o };
    }
    function r(u, a, g, D) {
      const { srcStat: t, destStat: o } = w(u, a, D);
      if (o) {
        if (S(t, o)) {
          const c = i.basename(u);
          const d = i.basename(a);
          if (g === "move" && c !== d && c.toLowerCase() === d.toLowerCase()) {
            return { srcStat: t, destStat: o, isChangingCase: true };
          }
          throw new Error("Source and destination must not be the same.");
        }
        if (t.isDirectory() && !o.isDirectory()) {
          throw new Error(`Cannot overwrite non-directory '${a}' with directory '${u}'.`);
        }
        if (!t.isDirectory() && o.isDirectory()) {
          throw new Error(`Cannot overwrite directory '${a}' with non-directory '${u}'.`);
        }
      }
      if (t.isDirectory() && F(u, a)) {
        throw new Error(h(u, a, g));
      }
      return { srcStat: t, destStat: o };
    }
    async function P(u, a, g, D) {
      const t = i.resolve(i.dirname(u));
      const o = i.resolve(i.dirname(g));
      if (o === t || o === i.parse(o).root) return;
      let c;
      try {
        c = await e.stat(o, { bigint: true });
      } catch (d) {
        if (d.code === "ENOENT") return P(u, a, o, D);
        throw d;
      }
      if (S(a, c)) {
        throw new Error(h(u, g, D));
      }
      return P(u, a, o, D);
    }
    function E(u, a, g, D) {
      const t = i.resolve(i.dirname(u));
      const o = i.resolve(i.dirname(g));
      if (o === t || o === i.parse(o).root) return;
      let c;
      try {
        c = e.statSync(o, { bigint: true });
      } catch (d) {
        if (d.code === "ENOENT") return E(u, a, o, D);
        throw d;
      }
      if (S(a, c)) {
        throw new Error(h(u, g, D));
      }
      return E(u, a, o, D);
    }
    function S(u, a) {
      return a.ino !== void 0 && a.dev !== void 0 && a.ino === u.ino && a.dev === u.dev;
    }
    function F(u, a) {
      const g = i.resolve(u).split(i.sep).filter((t) => t);
      const D = i.resolve(a).split(i.sep).filter((t) => t);
      return g.every((t, o) => D[o] === t);
    }
    function h(u, a, g) {
      return `Cannot ${g} '${u}' to a subdirectory of itself, '${a}'.`;
    }
    l.exports = {
      // checkPaths
      checkPaths: s(m),
      checkPathsSync: r,
      // checkParent
      checkParentPaths: s(P),
      checkParentPathsSync: E,
      // Misc
      isSrcSubdir: F,
      areIdentical: S
    };
  },
  /***/
  490(l, O, n) {
    const e = n(982);
    const i = n(201).fromPromise;
    async function s(w, m, r) {
      const P = await e.open(w, "r+");
      let E = null;
      try {
        await e.futimes(P, m, r);
      } catch (S) {
        E = S;
      } finally {
        try {
          await e.close(P);
        } catch (S) {
          if (!E) E = S;
        }
      }
      if (E) {
        throw E;
      }
    }
    function y(w, m, r) {
      const P = e.openSync(w, "r+");
      let E = null;
      try {
        e.futimesSync(P, m, r);
      } catch (S) {
        E = S;
      } finally {
        try {
          e.closeSync(P);
        } catch (S) {
          if (!E) E = S;
        }
      }
      if (E) {
        throw E;
      }
    }
    l.exports = {
      utimesMillis: i(s),
      utimesMillisSync: y
    };
  },
  /***/
  696(l) {
    l.exports = n;
    var O = Object.getPrototypeOf || function(e) {
      return e.__proto__;
    };
    function n(e) {
      if (e === null || typeof e !== "object")
        return e;
      if (e instanceof Object)
        var i = { __proto__: O(e) };
      else
        var i = /* @__PURE__ */ Object.create(null);
      Object.getOwnPropertyNames(e).forEach(function(s) {
        Object.defineProperty(i, s, Object.getOwnPropertyDescriptor(e, s));
      });
      return i;
    }
  },
  /***/
  916(l, O, n) {
    var e = n(896);
    var i = n(593);
    var s = n(90);
    var y = n(696);
    var w = n(23);
    var m;
    var r;
    if (typeof Symbol === "function" && typeof Symbol.for === "function") {
      m = /* @__PURE__ */ Symbol.for("graceful-fs.queue");
      r = /* @__PURE__ */ Symbol.for("graceful-fs.previous");
    } else {
      m = "___graceful-fs.queue";
      r = "___graceful-fs.previous";
    }
    function P() {
    }
    function E(t, o) {
      Object.defineProperty(t, m, {
        get: function() {
          return o;
        }
      });
    }
    var S = P;
    if (w.debuglog)
      S = w.debuglog("gfs4");
    else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
      S = function() {
        var t = w.format.apply(w, arguments);
        t = "GFS4: " + t.split(/\n/).join("\nGFS4: ");
        console.error(t);
      };
    if (!e[m]) {
      var F = global[m] || [];
      E(e, F);
      e.close = (function(t) {
        function o(c, d) {
          return t.call(e, c, function(v) {
            if (!v) {
              g();
            }
            if (typeof d === "function")
              d.apply(this, arguments);
          });
        }
        Object.defineProperty(o, r, {
          value: t
        });
        return o;
      })(e.close);
      e.closeSync = (function(t) {
        function o(c) {
          t.apply(e, arguments);
          g();
        }
        Object.defineProperty(o, r, {
          value: t
        });
        return o;
      })(e.closeSync);
      if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
        process.on("exit", function() {
          S(e[m]);
          n(613).equal(e[m].length, 0);
        });
      }
    }
    if (!global[m]) {
      E(global, e[m]);
    }
    l.exports = h(y(e));
    if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !e.__patched) {
      l.exports = h(e);
      e.__patched = true;
    }
    function h(t) {
      i(t);
      t.gracefulify = h;
      t.createReadStream = rt;
      t.createWriteStream = it;
      var o = t.readFile;
      t.readFile = c;
      function c(N, L, T) {
        if (typeof L === "function")
          T = L, L = null;
        return W(N, L, T);
        function W(M, R, j, A) {
          return o(M, R, function($) {
            if ($ && ($.code === "EMFILE" || $.code === "ENFILE"))
              u([W, [M, R, j], $, A || Date.now(), Date.now()]);
            else {
              if (typeof j === "function")
                j.apply(this, arguments);
            }
          });
        }
      }
      var d = t.writeFile;
      t.writeFile = v;
      function v(N, L, T, W) {
        if (typeof T === "function")
          W = T, T = null;
        return M(N, L, T, W);
        function M(R, j, A, $, J) {
          return d(R, j, A, function(I) {
            if (I && (I.code === "EMFILE" || I.code === "ENFILE"))
              u([M, [R, j, A, $], I, J || Date.now(), Date.now()]);
            else {
              if (typeof $ === "function")
                $.apply(this, arguments);
            }
          });
        }
      }
      var f = t.appendFile;
      if (f)
        t.appendFile = p;
      function p(N, L, T, W) {
        if (typeof T === "function")
          W = T, T = null;
        return M(N, L, T, W);
        function M(R, j, A, $, J) {
          return f(R, j, A, function(I) {
            if (I && (I.code === "EMFILE" || I.code === "ENFILE"))
              u([M, [R, j, A, $], I, J || Date.now(), Date.now()]);
            else {
              if (typeof $ === "function")
                $.apply(this, arguments);
            }
          });
        }
      }
      var x = t.copyFile;
      if (x)
        t.copyFile = k;
      function k(N, L, T, W) {
        if (typeof T === "function") {
          W = T;
          T = 0;
        }
        return M(N, L, T, W);
        function M(R, j, A, $, J) {
          return x(R, j, A, function(I) {
            if (I && (I.code === "EMFILE" || I.code === "ENFILE"))
              u([M, [R, j, A, $], I, J || Date.now(), Date.now()]);
            else {
              if (typeof $ === "function")
                $.apply(this, arguments);
            }
          });
        }
      }
      var b = t.readdir;
      t.readdir = Y;
      var C = /^v[0-5]\./;
      function Y(N, L, T) {
        if (typeof L === "function")
          T = L, L = null;
        var W = C.test(process.version) ? function R(j, A, $, J) {
          return b(j, M(
            j,
            A,
            $,
            J
          ));
        } : function R(j, A, $, J) {
          return b(j, A, M(
            j,
            A,
            $,
            J
          ));
        };
        return W(N, L, T);
        function M(R, j, A, $) {
          return function(J, I) {
            if (J && (J.code === "EMFILE" || J.code === "ENFILE"))
              u([
                W,
                [R, j, A],
                J,
                $ || Date.now(),
                Date.now()
              ]);
            else {
              if (I && I.sort)
                I.sort();
              if (typeof A === "function")
                A.call(this, J, I);
            }
          };
        }
      }
      if (process.version.substr(0, 4) === "v0.8") {
        var V = s(t);
        B = V.ReadStream;
        U = V.WriteStream;
      }
      var Q = t.ReadStream;
      if (Q) {
        B.prototype = Object.create(Q.prototype);
        B.prototype.open = et;
      }
      var X = t.WriteStream;
      if (X) {
        U.prototype = Object.create(X.prototype);
        U.prototype.open = nt;
      }
      Object.defineProperty(t, "ReadStream", {
        get: function() {
          return B;
        },
        set: function(N) {
          B = N;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(t, "WriteStream", {
        get: function() {
          return U;
        },
        set: function(N) {
          U = N;
        },
        enumerable: true,
        configurable: true
      });
      var H = B;
      Object.defineProperty(t, "FileReadStream", {
        get: function() {
          return H;
        },
        set: function(N) {
          H = N;
        },
        enumerable: true,
        configurable: true
      });
      var Z = U;
      Object.defineProperty(t, "FileWriteStream", {
        get: function() {
          return Z;
        },
        set: function(N) {
          Z = N;
        },
        enumerable: true,
        configurable: true
      });
      function B(N, L) {
        if (this instanceof B)
          return Q.apply(this, arguments), this;
        else
          return B.apply(Object.create(B.prototype), arguments);
      }
      function et() {
        var N = this;
        z(N.path, N.flags, N.mode, function(L, T) {
          if (L) {
            if (N.autoClose)
              N.destroy();
            N.emit("error", L);
          } else {
            N.fd = T;
            N.emit("open", T);
            N.read();
          }
        });
      }
      function U(N, L) {
        if (this instanceof U)
          return X.apply(this, arguments), this;
        else
          return U.apply(Object.create(U.prototype), arguments);
      }
      function nt() {
        var N = this;
        z(N.path, N.flags, N.mode, function(L, T) {
          if (L) {
            N.destroy();
            N.emit("error", L);
          } else {
            N.fd = T;
            N.emit("open", T);
          }
        });
      }
      function rt(N, L) {
        return new t.ReadStream(N, L);
      }
      function it(N, L) {
        return new t.WriteStream(N, L);
      }
      var ot = t.open;
      t.open = z;
      function z(N, L, T, W) {
        if (typeof T === "function")
          W = T, T = null;
        return M(N, L, T, W);
        function M(R, j, A, $, J) {
          return ot(R, j, A, function(I, lt) {
            if (I && (I.code === "EMFILE" || I.code === "ENFILE"))
              u([M, [R, j, A, $], I, J || Date.now(), Date.now()]);
            else {
              if (typeof $ === "function")
                $.apply(this, arguments);
            }
          });
        }
      }
      return t;
    }
    function u(t) {
      S("ENQUEUE", t[0].name, t[1]);
      e[m].push(t);
      D();
    }
    var a;
    function g() {
      var t = Date.now();
      for (var o = 0; o < e[m].length; ++o) {
        if (e[m][o].length > 2) {
          e[m][o][3] = t;
          e[m][o][4] = t;
        }
      }
      D();
    }
    function D() {
      clearTimeout(a);
      a = void 0;
      if (e[m].length === 0)
        return;
      var t = e[m].shift();
      var o = t[0];
      var c = t[1];
      var d = t[2];
      var v = t[3];
      var f = t[4];
      if (v === void 0) {
        S("RETRY", o.name, c);
        o.apply(null, c);
      } else if (Date.now() - v >= 6e4) {
        S("TIMEOUT", o.name, c);
        var p = c.pop();
        if (typeof p === "function")
          p.call(null, d);
      } else {
        var x = Date.now() - f;
        var k = Math.max(f - v, 1);
        var b = Math.min(k * 1.2, 100);
        if (x >= b) {
          S("RETRY", o.name, c);
          o.apply(null, c.concat([v]));
        } else {
          e[m].push(t);
        }
      }
      if (a === void 0) {
        a = setTimeout(D, 0);
      }
    }
  },
  /***/
  90(l, O, n) {
    var e = n(203).Stream;
    l.exports = i;
    function i(s) {
      return {
        ReadStream: y,
        WriteStream: w
      };
      function y(m, r) {
        if (!(this instanceof y)) return new y(m, r);
        e.call(this);
        var P = this;
        this.path = m;
        this.fd = null;
        this.readable = true;
        this.paused = false;
        this.flags = "r";
        this.mode = 438;
        this.bufferSize = 64 * 1024;
        r = r || {};
        var E = Object.keys(r);
        for (var S = 0, F = E.length; S < F; S++) {
          var h = E[S];
          this[h] = r[h];
        }
        if (this.encoding) this.setEncoding(this.encoding);
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.end === void 0) {
            this.end = Infinity;
          } else if ("number" !== typeof this.end) {
            throw TypeError("end must be a Number");
          }
          if (this.start > this.end) {
            throw new Error("start must be <= end");
          }
          this.pos = this.start;
        }
        if (this.fd !== null) {
          process.nextTick(function() {
            P._read();
          });
          return;
        }
        s.open(this.path, this.flags, this.mode, function(u, a) {
          if (u) {
            P.emit("error", u);
            P.readable = false;
            return;
          }
          P.fd = a;
          P.emit("open", a);
          P._read();
        });
      }
      function w(m, r) {
        if (!(this instanceof w)) return new w(m, r);
        e.call(this);
        this.path = m;
        this.fd = null;
        this.writable = true;
        this.flags = "w";
        this.encoding = "binary";
        this.mode = 438;
        this.bytesWritten = 0;
        r = r || {};
        var P = Object.keys(r);
        for (var E = 0, S = P.length; E < S; E++) {
          var F = P[E];
          this[F] = r[F];
        }
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.start < 0) {
            throw new Error("start must be >= zero");
          }
          this.pos = this.start;
        }
        this.busy = false;
        this._queue = [];
        if (this.fd === null) {
          this._open = s.open;
          this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
          this.flush();
        }
      }
    }
  },
  /***/
  593(l, O, n) {
    var e = n(140);
    var i = process.cwd;
    var s = null;
    var y = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function() {
      if (!s)
        s = i.call(process);
      return s;
    };
    try {
      process.cwd();
    } catch (r) {
    }
    if (typeof process.chdir === "function") {
      var w = process.chdir;
      process.chdir = function(r) {
        s = null;
        w.call(process, r);
      };
      if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, w);
    }
    l.exports = m;
    function m(r) {
      if (e.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
        P(r);
      }
      if (!r.lutimes) {
        E(r);
      }
      r.chown = h(r.chown);
      r.fchown = h(r.fchown);
      r.lchown = h(r.lchown);
      r.chmod = S(r.chmod);
      r.fchmod = S(r.fchmod);
      r.lchmod = S(r.lchmod);
      r.chownSync = u(r.chownSync);
      r.fchownSync = u(r.fchownSync);
      r.lchownSync = u(r.lchownSync);
      r.chmodSync = F(r.chmodSync);
      r.fchmodSync = F(r.fchmodSync);
      r.lchmodSync = F(r.lchmodSync);
      r.stat = a(r.stat);
      r.fstat = a(r.fstat);
      r.lstat = a(r.lstat);
      r.statSync = g(r.statSync);
      r.fstatSync = g(r.fstatSync);
      r.lstatSync = g(r.lstatSync);
      if (r.chmod && !r.lchmod) {
        r.lchmod = function(t, o, c) {
          if (c) process.nextTick(c);
        };
        r.lchmodSync = function() {
        };
      }
      if (r.chown && !r.lchown) {
        r.lchown = function(t, o, c, d) {
          if (d) process.nextTick(d);
        };
        r.lchownSync = function() {
        };
      }
      if (y === "win32") {
        r.rename = typeof r.rename !== "function" ? r.rename : (function(t) {
          function o(c, d, v) {
            var f = Date.now();
            var p = 0;
            t(c, d, function x(k) {
              if (k && (k.code === "EACCES" || k.code === "EPERM" || k.code === "EBUSY") && Date.now() - f < 6e4) {
                setTimeout(function() {
                  r.stat(d, function(b, C) {
                    if (b && b.code === "ENOENT")
                      t(c, d, x);
                    else
                      v(k);
                  });
                }, p);
                if (p < 100)
                  p += 10;
                return;
              }
              if (v) v(k);
            });
          }
          if (Object.setPrototypeOf) Object.setPrototypeOf(o, t);
          return o;
        })(r.rename);
      }
      r.read = typeof r.read !== "function" ? r.read : (function(t) {
        function o(c, d, v, f, p, x) {
          var k;
          if (x && typeof x === "function") {
            var b = 0;
            k = function(C, Y, V) {
              if (C && C.code === "EAGAIN" && b < 10) {
                b++;
                return t.call(r, c, d, v, f, p, k);
              }
              x.apply(this, arguments);
            };
          }
          return t.call(r, c, d, v, f, p, k);
        }
        if (Object.setPrototypeOf) Object.setPrototypeOf(o, t);
        return o;
      })(r.read);
      r.readSync = typeof r.readSync !== "function" ? r.readSync : /* @__PURE__ */ (function(t) {
        return function(o, c, d, v, f) {
          var p = 0;
          while (true) {
            try {
              return t.call(r, o, c, d, v, f);
            } catch (x) {
              if (x.code === "EAGAIN" && p < 10) {
                p++;
                continue;
              }
              throw x;
            }
          }
        };
      })(r.readSync);
      function P(t) {
        t.lchmod = function(o, c, d) {
          t.open(
            o,
            e.O_WRONLY | e.O_SYMLINK,
            c,
            function(v, f) {
              if (v) {
                if (d) d(v);
                return;
              }
              t.fchmod(f, c, function(p) {
                t.close(f, function(x) {
                  if (d) d(p || x);
                });
              });
            }
          );
        };
        t.lchmodSync = function(o, c) {
          var d = t.openSync(o, e.O_WRONLY | e.O_SYMLINK, c);
          var v = true;
          var f;
          try {
            f = t.fchmodSync(d, c);
            v = false;
          } finally {
            if (v) {
              try {
                t.closeSync(d);
              } catch (p) {
              }
            } else {
              t.closeSync(d);
            }
          }
          return f;
        };
      }
      function E(t) {
        if (e.hasOwnProperty("O_SYMLINK") && t.futimes) {
          t.lutimes = function(o, c, d, v) {
            t.open(o, e.O_SYMLINK, function(f, p) {
              if (f) {
                if (v) v(f);
                return;
              }
              t.futimes(p, c, d, function(x) {
                t.close(p, function(k) {
                  if (v) v(x || k);
                });
              });
            });
          };
          t.lutimesSync = function(o, c, d) {
            var v = t.openSync(o, e.O_SYMLINK);
            var f;
            var p = true;
            try {
              f = t.futimesSync(v, c, d);
              p = false;
            } finally {
              if (p) {
                try {
                  t.closeSync(v);
                } catch (x) {
                }
              } else {
                t.closeSync(v);
              }
            }
            return f;
          };
        } else if (t.futimes) {
          t.lutimes = function(o, c, d, v) {
            if (v) process.nextTick(v);
          };
          t.lutimesSync = function() {
          };
        }
      }
      function S(t) {
        if (!t) return t;
        return function(o, c, d) {
          return t.call(r, o, c, function(v) {
            if (D(v)) v = null;
            if (d) d.apply(this, arguments);
          });
        };
      }
      function F(t) {
        if (!t) return t;
        return function(o, c) {
          try {
            return t.call(r, o, c);
          } catch (d) {
            if (!D(d)) throw d;
          }
        };
      }
      function h(t) {
        if (!t) return t;
        return function(o, c, d, v) {
          return t.call(r, o, c, d, function(f) {
            if (D(f)) f = null;
            if (v) v.apply(this, arguments);
          });
        };
      }
      function u(t) {
        if (!t) return t;
        return function(o, c, d) {
          try {
            return t.call(r, o, c, d);
          } catch (v) {
            if (!D(v)) throw v;
          }
        };
      }
      function a(t) {
        if (!t) return t;
        return function(o, c, d) {
          if (typeof c === "function") {
            d = c;
            c = null;
          }
          function v(f, p) {
            if (p) {
              if (p.uid < 0) p.uid += 4294967296;
              if (p.gid < 0) p.gid += 4294967296;
            }
            if (d) d.apply(this, arguments);
          }
          return c ? t.call(r, o, c, v) : t.call(r, o, v);
        };
      }
      function g(t) {
        if (!t) return t;
        return function(o, c) {
          var d = c ? t.call(r, o, c) : t.call(r, o);
          if (d) {
            if (d.uid < 0) d.uid += 4294967296;
            if (d.gid < 0) d.gid += 4294967296;
          }
          return d;
        };
      }
      function D(t) {
        if (!t)
          return true;
        if (t.code === "ENOSYS")
          return true;
        var o = !process.getuid || process.getuid() !== 0;
        if (o) {
          if (t.code === "EINVAL" || t.code === "EPERM")
            return true;
        }
        return false;
      }
    }
  },
  /***/
  759(l, O, n) {
    let e;
    try {
      e = n(916);
    } catch (F) {
      e = n(896);
    }
    const i = n(201);
    const { stringify: s, stripBom: y } = n(733);
    async function w(F, h = {}) {
      if (typeof h === "string") {
        h = { encoding: h };
      }
      const u = h.fs || e;
      const a = "throws" in h ? h.throws : true;
      let g = await i.fromCallback(u.readFile)(F, h);
      g = y(g);
      let D;
      try {
        D = JSON.parse(g, h ? h.reviver : null);
      } catch (t) {
        if (a) {
          t.message = `${F}: ${t.message}`;
          throw t;
        } else {
          return null;
        }
      }
      return D;
    }
    const m = i.fromPromise(w);
    function r(F, h = {}) {
      if (typeof h === "string") {
        h = { encoding: h };
      }
      const u = h.fs || e;
      const a = "throws" in h ? h.throws : true;
      try {
        let g = u.readFileSync(F, h);
        g = y(g);
        return JSON.parse(g, h.reviver);
      } catch (g) {
        if (a) {
          g.message = `${F}: ${g.message}`;
          throw g;
        } else {
          return null;
        }
      }
    }
    async function P(F, h, u = {}) {
      const a = u.fs || e;
      const g = s(h, u);
      await i.fromCallback(a.writeFile)(F, g, u);
    }
    const E = i.fromPromise(P);
    function S(F, h, u = {}) {
      const a = u.fs || e;
      const g = s(h, u);
      return a.writeFileSync(F, g, u);
    }
    l.exports = {
      readFile: m,
      readFileSync: r,
      writeFile: E,
      writeFileSync: S
    };
  },
  /***/
  733(l) {
    function O(e, { EOL: i = "\n", finalEOL: s = true, replacer: y = null, spaces: w } = {}) {
      const m = s ? i : "";
      const r = JSON.stringify(e, y, w);
      if (r === void 0) {
        throw new TypeError(`Converting ${typeof e} value to JSON is not supported`);
      }
      return r.replace(/\n/g, i) + m;
    }
    function n(e) {
      if (Buffer.isBuffer(e)) e = e.toString("utf8");
      return e.replace(/^\uFEFF/, "");
    }
    l.exports = { stringify: O, stripBom: n };
  },
  /***/
  201(l, O) {
    O.fromCallback = function(n) {
      return Object.defineProperty(function(...e) {
        if (typeof e[e.length - 1] === "function") n.apply(this, e);
        else {
          return new Promise((i, s) => {
            e.push((y, w) => y != null ? s(y) : i(w));
            n.apply(this, e);
          });
        }
      }, "name", { value: n.name });
    };
    O.fromPromise = function(n) {
      return Object.defineProperty(function(...e) {
        const i = e[e.length - 1];
        if (typeof i !== "function") return n.apply(this, e);
        else {
          e.pop();
          n.apply(this, e).then((s) => i(null, s), i);
        }
      }, "name", { value: n.name });
    };
  },
  /***/
  613(l) {
    l.exports = G("assert");
  },
  /***/
  140(l) {
    l.exports = G("constants");
  },
  /***/
  896(l) {
    l.exports = G("fs");
  },
  /***/
  928(l) {
    l.exports = G("path");
  },
  /***/
  203(l) {
    l.exports = G("stream");
  },
  /***/
  23(l) {
    l.exports = G("util");
  }
  /******/
};
const q = {};
function K(l) {
  const O = q[l];
  if (O !== void 0) {
    return O.exports;
  }
  const n = q[l] = {
    /******/
    // no module.id needed
    /******/
    // no module.loaded needed
    /******/
    exports: {}
    /******/
  };
  at[l](n, n.exports, K);
  return n.exports;
}
(() => {
  K.d = (l, O) => {
    if (Array.isArray(O)) {
      var n = 0;
      while (n < O.length) {
        var e = O[n++];
        var i = O[n++];
        if (!K.o(l, e)) {
          if (i === 0) {
            Object.defineProperty(l, e, { enumerable: true, value: O[n++] });
          } else {
            Object.defineProperty(l, e, { enumerable: true, get: i });
          }
        } else if (i === 0) {
          n++;
        }
      }
    } else {
      for (var e in O) {
        if (K.o(O, e) && !K.o(l, e)) {
          Object.defineProperty(l, e, { enumerable: true, get: O[e] });
        }
      }
    }
  };
})();
(() => {
  K.o = (l, O) => Object.hasOwn(l, O);
})();
let _ = {};
var st = K(804);
const tt = function(l = { from: "app/public/src", to: "app/build/src" }) {
  if (Array.isArray(l)) {
    this.list = l;
  } else {
    this.list = [
      {
        from: l.from,
        to: l.to
      }
    ];
  }
};
tt.prototype.apply = function(l) {
  l.hooks.done.tap("CopyFilePlugin", ({ compilation: O }) => {
    if (!O.errors.length) {
      this.list.map(({ from: n, to: e, isDef: i }) => {
        st.copy(n, e, (s) => {
          if (s && !i) {
            console.warn(`Copy File Error: ${s.message}`);
          }
        });
      });
    }
  });
};
const ut = tt;
K.d(_, [
  /* harmony export */
  "A",
  0,
  /* export default binding */
  ut
  /* harmony export */
]);
const ft = _.A;
export {
  ft as default
};
