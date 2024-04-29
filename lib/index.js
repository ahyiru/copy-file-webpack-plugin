import { createRequire as G } from "module";
var ot = {
  /***/
  323: (
    /***/
    (m, k, r) => {
      const e = r(916);
      const o = r(928);
      const u = r(965).mkdirsSync;
      const y = r(490).utimesMillisSync;
      const d = r(619);
      function s(h, v, E) {
        if (typeof E === "function") {
          E = { filter: E };
        }
        E = E || {};
        E.clobber = "clobber" in E ? !!E.clobber : true;
        E.overwrite = "overwrite" in E ? !!E.overwrite : E.clobber;
        if (E.preserveTimestamps && process.arch === "ia32") {
          process.emitWarning(
            "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269",
            "Warning",
            "fs-extra-WARN0002"
          );
        }
        const { srcStat: D, destStat: C } = d.checkPathsSync(h, v, "copy", E);
        d.checkParentPathsSync(h, D, v, "copy");
        if (E.filter && !E.filter(h, v))
          return;
        const T = o.dirname(v);
        if (!e.existsSync(T))
          u(T);
        return n(C, h, v, E);
      }
      function n(h, v, E, D) {
        const C = D.dereference ? e.statSync : e.lstatSync;
        const T = C(v);
        if (T.isDirectory())
          return S(T, h, v, E, D);
        else if (T.isFile() || T.isCharacterDevice() || T.isBlockDevice())
          return P(T, h, v, E, D);
        else if (T.isSymbolicLink())
          return l(h, v, E, D);
        else if (T.isSocket())
          throw new Error(`Cannot copy a socket file: ${v}`);
        else if (T.isFIFO())
          throw new Error(`Cannot copy a FIFO pipe: ${v}`);
        throw new Error(`Unknown file: ${v}`);
      }
      function P(h, v, E, D, C) {
        if (!v)
          return p(h, E, D, C);
        return x(h, E, D, C);
      }
      function x(h, v, E, D) {
        if (D.overwrite) {
          e.unlinkSync(E);
          return p(h, v, E, D);
        } else if (D.errorOnExist) {
          throw new Error(`'${E}' already exists`);
        }
      }
      function p(h, v, E, D) {
        e.copyFileSync(v, E);
        if (D.preserveTimestamps)
          O(h.mode, v, E);
        return a(E, h.mode);
      }
      function O(h, v, E) {
        if (w(h))
          c(E, h);
        return g(v, E);
      }
      function w(h) {
        return (h & 128) === 0;
      }
      function c(h, v) {
        return a(h, v | 128);
      }
      function a(h, v) {
        return e.chmodSync(h, v);
      }
      function g(h, v) {
        const E = e.statSync(h);
        return y(v, E.atime, E.mtime);
      }
      function S(h, v, E, D, C) {
        if (!v)
          return t(h.mode, E, D, C);
        return i(E, D, C);
      }
      function t(h, v, E, D) {
        e.mkdirSync(E);
        i(v, E, D);
        return a(E, h);
      }
      function i(h, v, E) {
        e.readdirSync(h).forEach((D) => f(D, h, v, E));
      }
      function f(h, v, E, D) {
        const C = o.join(v, h);
        const T = o.join(E, h);
        if (D.filter && !D.filter(C, T))
          return;
        const { destStat: Y } = d.checkPathsSync(C, T, "copy", D);
        return n(Y, C, T, D);
      }
      function l(h, v, E, D) {
        let C = e.readlinkSync(v);
        if (D.dereference) {
          C = o.resolve(process.cwd(), C);
        }
        if (!h) {
          return e.symlinkSync(C, E);
        } else {
          let T;
          try {
            T = e.readlinkSync(E);
          } catch (Y) {
            if (Y.code === "EINVAL" || Y.code === "UNKNOWN")
              return e.symlinkSync(C, E);
            throw Y;
          }
          if (D.dereference) {
            T = o.resolve(process.cwd(), T);
          }
          if (d.isSrcSubdir(C, T)) {
            throw new Error(`Cannot copy '${C}' to a subdirectory of itself, '${T}'.`);
          }
          if (d.isSrcSubdir(T, C)) {
            throw new Error(`Cannot overwrite '${T}' with '${C}'.`);
          }
          return F(C, E);
        }
      }
      function F(h, v) {
        e.unlinkSync(v);
        return e.symlinkSync(h, v);
      }
      m.exports = s;
    }
  ),
  /***/
  315: (
    /***/
    (m, k, r) => {
      const e = r(982);
      const o = r(928);
      const { mkdirs: u } = r(965);
      const { pathExists: y } = r(709);
      const { utimesMillis: d } = r(490);
      const s = r(619);
      async function n(S, t, i = {}) {
        if (typeof i === "function") {
          i = { filter: i };
        }
        i.clobber = "clobber" in i ? !!i.clobber : true;
        i.overwrite = "overwrite" in i ? !!i.overwrite : i.clobber;
        if (i.preserveTimestamps && process.arch === "ia32") {
          process.emitWarning(
            "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269",
            "Warning",
            "fs-extra-WARN0001"
          );
        }
        const { srcStat: f, destStat: l } = await s.checkPaths(S, t, "copy", i);
        await s.checkParentPaths(S, f, t, "copy");
        const F = await P(S, t, i);
        if (!F)
          return;
        const h = o.dirname(t);
        const v = await y(h);
        if (!v) {
          await u(h);
        }
        await x(l, S, t, i);
      }
      async function P(S, t, i) {
        if (!i.filter)
          return true;
        return i.filter(S, t);
      }
      async function x(S, t, i, f) {
        const l = f.dereference ? e.stat : e.lstat;
        const F = await l(t);
        if (F.isDirectory())
          return a(F, S, t, i, f);
        if (F.isFile() || F.isCharacterDevice() || F.isBlockDevice())
          return p(F, S, t, i, f);
        if (F.isSymbolicLink())
          return g(S, t, i, f);
        if (F.isSocket())
          throw new Error(`Cannot copy a socket file: ${t}`);
        if (F.isFIFO())
          throw new Error(`Cannot copy a FIFO pipe: ${t}`);
        throw new Error(`Unknown file: ${t}`);
      }
      async function p(S, t, i, f, l) {
        if (!t)
          return O(S, i, f, l);
        if (l.overwrite) {
          await e.unlink(f);
          return O(S, i, f, l);
        }
        if (l.errorOnExist) {
          throw new Error(`'${f}' already exists`);
        }
      }
      async function O(S, t, i, f) {
        await e.copyFile(t, i);
        if (f.preserveTimestamps) {
          if (w(S.mode)) {
            await c(i, S.mode);
          }
          const l = await e.stat(t);
          await d(i, l.atime, l.mtime);
        }
        return e.chmod(i, S.mode);
      }
      function w(S) {
        return (S & 128) === 0;
      }
      function c(S, t) {
        return e.chmod(S, t | 128);
      }
      async function a(S, t, i, f, l) {
        if (!t) {
          await e.mkdir(f);
        }
        const F = await e.readdir(i);
        await Promise.all(F.map(async (h) => {
          const v = o.join(i, h);
          const E = o.join(f, h);
          const D = await P(v, E, l);
          if (!D)
            return;
          const { destStat: C } = await s.checkPaths(v, E, "copy", l);
          return x(C, v, E, l);
        }));
        if (!t) {
          await e.chmod(f, S.mode);
        }
      }
      async function g(S, t, i, f) {
        let l = await e.readlink(t);
        if (f.dereference) {
          l = o.resolve(process.cwd(), l);
        }
        if (!S) {
          return e.symlink(l, i);
        }
        let F = null;
        try {
          F = await e.readlink(i);
        } catch (h) {
          if (h.code === "EINVAL" || h.code === "UNKNOWN")
            return e.symlink(l, i);
          throw h;
        }
        if (f.dereference) {
          F = o.resolve(process.cwd(), F);
        }
        if (s.isSrcSubdir(l, F)) {
          throw new Error(`Cannot copy '${l}' to a subdirectory of itself, '${F}'.`);
        }
        if (s.isSrcSubdir(F, l)) {
          throw new Error(`Cannot overwrite '${F}' with '${l}'.`);
        }
        await e.unlink(i);
        return e.symlink(l, i);
      }
      m.exports = n;
    }
  ),
  /***/
  280: (
    /***/
    (m, k, r) => {
      const e = r(201).fromPromise;
      m.exports = {
        copy: e(r(315)),
        copySync: r(323)
      };
    }
  ),
  /***/
  870: (
    /***/
    (m, k, r) => {
      const e = r(201).fromPromise;
      const o = r(982);
      const u = r(928);
      const y = r(965);
      const d = r(257);
      const s = e(async function P(x) {
        let p;
        try {
          p = await o.readdir(x);
        } catch {
          return y.mkdirs(x);
        }
        return Promise.all(p.map((O) => d.remove(u.join(x, O))));
      });
      function n(P) {
        let x;
        try {
          x = o.readdirSync(P);
        } catch {
          return y.mkdirsSync(P);
        }
        x.forEach((p) => {
          p = u.join(P, p);
          d.removeSync(p);
        });
      }
      m.exports = {
        emptyDirSync: n,
        emptydirSync: n,
        emptyDir: s,
        emptydir: s
      };
    }
  ),
  /***/
  229: (
    /***/
    (m, k, r) => {
      const e = r(201).fromPromise;
      const o = r(928);
      const u = r(982);
      const y = r(965);
      async function d(n) {
        let P;
        try {
          P = await u.stat(n);
        } catch {
        }
        if (P && P.isFile())
          return;
        const x = o.dirname(n);
        let p = null;
        try {
          p = await u.stat(x);
        } catch (O) {
          if (O.code === "ENOENT") {
            await y.mkdirs(x);
            await u.writeFile(n, "");
            return;
          } else {
            throw O;
          }
        }
        if (p.isDirectory()) {
          await u.writeFile(n, "");
        } else {
          await u.readdir(x);
        }
      }
      function s(n) {
        let P;
        try {
          P = u.statSync(n);
        } catch {
        }
        if (P && P.isFile())
          return;
        const x = o.dirname(n);
        try {
          if (!u.statSync(x).isDirectory()) {
            u.readdirSync(x);
          }
        } catch (p) {
          if (p && p.code === "ENOENT")
            y.mkdirsSync(x);
          else
            throw p;
        }
        u.writeFileSync(n, "");
      }
      m.exports = {
        createFile: e(d),
        createFileSync: s
      };
    }
  ),
  /***/
  687: (
    /***/
    (m, k, r) => {
      const { createFile: e, createFileSync: o } = r(229);
      const { createLink: u, createLinkSync: y } = r(611);
      const { createSymlink: d, createSymlinkSync: s } = r(20);
      m.exports = {
        // file
        createFile: e,
        createFileSync: o,
        ensureFile: e,
        ensureFileSync: o,
        // link
        createLink: u,
        createLinkSync: y,
        ensureLink: u,
        ensureLinkSync: y,
        // symlink
        createSymlink: d,
        createSymlinkSync: s,
        ensureSymlink: d,
        ensureSymlinkSync: s
      };
    }
  ),
  /***/
  611: (
    /***/
    (m, k, r) => {
      const e = r(201).fromPromise;
      const o = r(928);
      const u = r(982);
      const y = r(965);
      const { pathExists: d } = r(709);
      const { areIdentical: s } = r(619);
      async function n(x, p) {
        let O;
        try {
          O = await u.lstat(p);
        } catch {
        }
        let w;
        try {
          w = await u.lstat(x);
        } catch (g) {
          g.message = g.message.replace("lstat", "ensureLink");
          throw g;
        }
        if (O && s(w, O))
          return;
        const c = o.dirname(p);
        const a = await d(c);
        if (!a) {
          await y.mkdirs(c);
        }
        await u.link(x, p);
      }
      function P(x, p) {
        let O;
        try {
          O = u.lstatSync(p);
        } catch {
        }
        try {
          const a = u.lstatSync(x);
          if (O && s(a, O))
            return;
        } catch (a) {
          a.message = a.message.replace("lstat", "ensureLink");
          throw a;
        }
        const w = o.dirname(p);
        const c = u.existsSync(w);
        if (c)
          return u.linkSync(x, p);
        y.mkdirsSync(w);
        return u.linkSync(x, p);
      }
      m.exports = {
        createLink: e(n),
        createLinkSync: P
      };
    }
  ),
  /***/
  141: (
    /***/
    (m, k, r) => {
      const e = r(928);
      const o = r(982);
      const { pathExists: u } = r(709);
      const y = r(201).fromPromise;
      async function d(n, P) {
        if (e.isAbsolute(n)) {
          try {
            await o.lstat(n);
          } catch (w) {
            w.message = w.message.replace("lstat", "ensureSymlink");
            throw w;
          }
          return {
            toCwd: n,
            toDst: n
          };
        }
        const x = e.dirname(P);
        const p = e.join(x, n);
        const O = await u(p);
        if (O) {
          return {
            toCwd: p,
            toDst: n
          };
        }
        try {
          await o.lstat(n);
        } catch (w) {
          w.message = w.message.replace("lstat", "ensureSymlink");
          throw w;
        }
        return {
          toCwd: n,
          toDst: e.relative(x, n)
        };
      }
      function s(n, P) {
        if (e.isAbsolute(n)) {
          const c = o.existsSync(n);
          if (!c)
            throw new Error("absolute srcpath does not exist");
          return {
            toCwd: n,
            toDst: n
          };
        }
        const x = e.dirname(P);
        const p = e.join(x, n);
        const O = o.existsSync(p);
        if (O) {
          return {
            toCwd: p,
            toDst: n
          };
        }
        const w = o.existsSync(n);
        if (!w)
          throw new Error("relative srcpath does not exist");
        return {
          toCwd: n,
          toDst: e.relative(x, n)
        };
      }
      m.exports = {
        symlinkPaths: y(d),
        symlinkPathsSync: s
      };
    }
  ),
  /***/
  633: (
    /***/
    (m, k, r) => {
      const e = r(982);
      const o = r(201).fromPromise;
      async function u(d, s) {
        if (s)
          return s;
        let n;
        try {
          n = await e.lstat(d);
        } catch {
          return "file";
        }
        return n && n.isDirectory() ? "dir" : "file";
      }
      function y(d, s) {
        if (s)
          return s;
        let n;
        try {
          n = e.lstatSync(d);
        } catch {
          return "file";
        }
        return n && n.isDirectory() ? "dir" : "file";
      }
      m.exports = {
        symlinkType: o(u),
        symlinkTypeSync: y
      };
    }
  ),
  /***/
  20: (
    /***/
    (m, k, r) => {
      const e = r(201).fromPromise;
      const o = r(928);
      const u = r(982);
      const { mkdirs: y, mkdirsSync: d } = r(965);
      const { symlinkPaths: s, symlinkPathsSync: n } = r(141);
      const { symlinkType: P, symlinkTypeSync: x } = r(633);
      const { pathExists: p } = r(709);
      const { areIdentical: O } = r(619);
      async function w(a, g, S) {
        let t;
        try {
          t = await u.lstat(g);
        } catch {
        }
        if (t && t.isSymbolicLink()) {
          const [F, h] = await Promise.all([
            u.stat(a),
            u.stat(g)
          ]);
          if (O(F, h))
            return;
        }
        const i = await s(a, g);
        a = i.toDst;
        const f = await P(i.toCwd, S);
        const l = o.dirname(g);
        if (!await p(l)) {
          await y(l);
        }
        return u.symlink(a, g, f);
      }
      function c(a, g, S) {
        let t;
        try {
          t = u.lstatSync(g);
        } catch {
        }
        if (t && t.isSymbolicLink()) {
          const F = u.statSync(a);
          const h = u.statSync(g);
          if (O(F, h))
            return;
        }
        const i = n(a, g);
        a = i.toDst;
        S = x(i.toCwd, S);
        const f = o.dirname(g);
        const l = u.existsSync(f);
        if (l)
          return u.symlinkSync(a, g, S);
        d(f);
        return u.symlinkSync(a, g, S);
      }
      m.exports = {
        createSymlink: e(w),
        createSymlinkSync: c
      };
    }
  ),
  /***/
  982: (
    /***/
    (m, k, r) => {
      const e = r(201).fromCallback;
      const o = r(916);
      const u = [
        "access",
        "appendFile",
        "chmod",
        "chown",
        "close",
        "copyFile",
        "fchmod",
        "fchown",
        "fdatasync",
        "fstat",
        "fsync",
        "ftruncate",
        "futimes",
        "lchmod",
        "lchown",
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
        "symlink",
        "truncate",
        "unlink",
        "utimes",
        "writeFile"
      ].filter((y) => {
        return typeof o[y] === "function";
      });
      Object.assign(k, o);
      u.forEach((y) => {
        k[y] = e(o[y]);
      });
      k.exists = function(y, d) {
        if (typeof d === "function") {
          return o.exists(y, d);
        }
        return new Promise((s) => {
          return o.exists(y, s);
        });
      };
      k.read = function(y, d, s, n, P, x) {
        if (typeof x === "function") {
          return o.read(y, d, s, n, P, x);
        }
        return new Promise((p, O) => {
          o.read(y, d, s, n, P, (w, c, a) => {
            if (w)
              return O(w);
            p({ bytesRead: c, buffer: a });
          });
        });
      };
      k.write = function(y, d, ...s) {
        if (typeof s[s.length - 1] === "function") {
          return o.write(y, d, ...s);
        }
        return new Promise((n, P) => {
          o.write(y, d, ...s, (x, p, O) => {
            if (x)
              return P(x);
            n({ bytesWritten: p, buffer: O });
          });
        });
      };
      k.readv = function(y, d, ...s) {
        if (typeof s[s.length - 1] === "function") {
          return o.readv(y, d, ...s);
        }
        return new Promise((n, P) => {
          o.readv(y, d, ...s, (x, p, O) => {
            if (x)
              return P(x);
            n({ bytesRead: p, buffers: O });
          });
        });
      };
      k.writev = function(y, d, ...s) {
        if (typeof s[s.length - 1] === "function") {
          return o.writev(y, d, ...s);
        }
        return new Promise((n, P) => {
          o.writev(y, d, ...s, (x, p, O) => {
            if (x)
              return P(x);
            n({ bytesWritten: p, buffers: O });
          });
        });
      };
      if (typeof o.realpath.native === "function") {
        k.realpath.native = e(o.realpath.native);
      } else {
        process.emitWarning(
          "fs.realpath.native is not a function. Is fs being monkey-patched?",
          "Warning",
          "fs-extra-WARN0003"
        );
      }
    }
  ),
  /***/
  804: (
    /***/
    (m, k, r) => {
      m.exports = {
        // Export promiseified graceful-fs:
        ...r(982),
        // Export extra methods:
        ...r(280),
        ...r(870),
        ...r(687),
        ...r(691),
        ...r(965),
        ...r(272),
        ...r(665),
        ...r(709),
        ...r(257)
      };
    }
  ),
  /***/
  691: (
    /***/
    (m, k, r) => {
      const e = r(201).fromPromise;
      const o = r(451);
      o.outputJson = e(r(954));
      o.outputJsonSync = r(373);
      o.outputJSON = o.outputJson;
      o.outputJSONSync = o.outputJsonSync;
      o.writeJSON = o.writeJson;
      o.writeJSONSync = o.writeJsonSync;
      o.readJSON = o.readJson;
      o.readJSONSync = o.readJsonSync;
      m.exports = o;
    }
  ),
  /***/
  451: (
    /***/
    (m, k, r) => {
      const e = r(759);
      m.exports = {
        // jsonfile exports
        readJson: e.readFile,
        readJsonSync: e.readFileSync,
        writeJson: e.writeFile,
        writeJsonSync: e.writeFileSync
      };
    }
  ),
  /***/
  373: (
    /***/
    (m, k, r) => {
      const { stringify: e } = r(733);
      const { outputFileSync: o } = r(665);
      function u(y, d, s) {
        const n = e(d, s);
        o(y, n, s);
      }
      m.exports = u;
    }
  ),
  /***/
  954: (
    /***/
    (m, k, r) => {
      const { stringify: e } = r(733);
      const { outputFile: o } = r(665);
      async function u(y, d, s = {}) {
        const n = e(d, s);
        await o(y, n, s);
      }
      m.exports = u;
    }
  ),
  /***/
  965: (
    /***/
    (m, k, r) => {
      const e = r(201).fromPromise;
      const { makeDir: o, makeDirSync: u } = r(541);
      const y = e(o);
      m.exports = {
        mkdirs: y,
        mkdirsSync: u,
        // alias
        mkdirp: y,
        mkdirpSync: u,
        ensureDir: y,
        ensureDirSync: u
      };
    }
  ),
  /***/
  541: (
    /***/
    (m, k, r) => {
      const e = r(982);
      const { checkPath: o } = r(712);
      const u = (y) => {
        const d = { mode: 511 };
        if (typeof y === "number")
          return y;
        return { ...d, ...y }.mode;
      };
      m.exports.makeDir = async (y, d) => {
        o(y);
        return e.mkdir(y, {
          mode: u(d),
          recursive: true
        });
      };
      m.exports.makeDirSync = (y, d) => {
        o(y);
        return e.mkdirSync(y, {
          mode: u(d),
          recursive: true
        });
      };
    }
  ),
  /***/
  712: (
    /***/
    (m, k, r) => {
      const e = r(928);
      m.exports.checkPath = function o(u) {
        if (process.platform === "win32") {
          const y = /[<>:"|?*]/.test(u.replace(e.parse(u).root, ""));
          if (y) {
            const d = new Error(`Path contains invalid characters: ${u}`);
            d.code = "EINVAL";
            throw d;
          }
        }
      };
    }
  ),
  /***/
  272: (
    /***/
    (m, k, r) => {
      const e = r(201).fromPromise;
      m.exports = {
        move: e(r(715)),
        moveSync: r(435)
      };
    }
  ),
  /***/
  435: (
    /***/
    (m, k, r) => {
      const e = r(916);
      const o = r(928);
      const u = r(280).copySync;
      const y = r(257).removeSync;
      const d = r(965).mkdirpSync;
      const s = r(619);
      function n(w, c, a) {
        a = a || {};
        const g = a.overwrite || a.clobber || false;
        const { srcStat: S, isChangingCase: t = false } = s.checkPathsSync(w, c, "move", a);
        s.checkParentPathsSync(w, S, c, "move");
        if (!P(c))
          d(o.dirname(c));
        return x(w, c, g, t);
      }
      function P(w) {
        const c = o.dirname(w);
        const a = o.parse(c);
        return a.root === c;
      }
      function x(w, c, a, g) {
        if (g)
          return p(w, c, a);
        if (a) {
          y(c);
          return p(w, c, a);
        }
        if (e.existsSync(c))
          throw new Error("dest already exists.");
        return p(w, c, a);
      }
      function p(w, c, a) {
        try {
          e.renameSync(w, c);
        } catch (g) {
          if (g.code !== "EXDEV")
            throw g;
          return O(w, c, a);
        }
      }
      function O(w, c, a) {
        const g = {
          overwrite: a,
          errorOnExist: true,
          preserveTimestamps: true
        };
        u(w, c, g);
        return y(w);
      }
      m.exports = n;
    }
  ),
  /***/
  715: (
    /***/
    (m, k, r) => {
      const e = r(982);
      const o = r(928);
      const { copy: u } = r(280);
      const { remove: y } = r(257);
      const { mkdirp: d } = r(965);
      const { pathExists: s } = r(709);
      const n = r(619);
      async function P(O, w, c = {}) {
        const a = c.overwrite || c.clobber || false;
        const { srcStat: g, isChangingCase: S = false } = await n.checkPaths(O, w, "move", c);
        await n.checkParentPaths(O, g, w, "move");
        const t = o.dirname(w);
        const i = o.parse(t);
        if (i.root !== t) {
          await d(t);
        }
        return x(O, w, a, S);
      }
      async function x(O, w, c, a) {
        if (!a) {
          if (c) {
            await y(w);
          } else if (await s(w)) {
            throw new Error("dest already exists.");
          }
        }
        try {
          await e.rename(O, w);
        } catch (g) {
          if (g.code !== "EXDEV") {
            throw g;
          }
          await p(O, w, c);
        }
      }
      async function p(O, w, c) {
        const a = {
          overwrite: c,
          errorOnExist: true,
          preserveTimestamps: true
        };
        await u(O, w, a);
        return y(O);
      }
      m.exports = P;
    }
  ),
  /***/
  665: (
    /***/
    (m, k, r) => {
      const e = r(201).fromPromise;
      const o = r(982);
      const u = r(928);
      const y = r(965);
      const d = r(709).pathExists;
      async function s(P, x, p = "utf-8") {
        const O = u.dirname(P);
        if (!await d(O)) {
          await y.mkdirs(O);
        }
        return o.writeFile(P, x, p);
      }
      function n(P, ...x) {
        const p = u.dirname(P);
        if (!o.existsSync(p)) {
          y.mkdirsSync(p);
        }
        o.writeFileSync(P, ...x);
      }
      m.exports = {
        outputFile: e(s),
        outputFileSync: n
      };
    }
  ),
  /***/
  709: (
    /***/
    (m, k, r) => {
      const e = r(201).fromPromise;
      const o = r(982);
      function u(y) {
        return o.access(y).then(() => true).catch(() => false);
      }
      m.exports = {
        pathExists: e(u),
        pathExistsSync: o.existsSync
      };
    }
  ),
  /***/
  257: (
    /***/
    (m, k, r) => {
      const e = r(916);
      const o = r(201).fromCallback;
      function u(d, s) {
        e.rm(d, { recursive: true, force: true }, s);
      }
      function y(d) {
        e.rmSync(d, { recursive: true, force: true });
      }
      m.exports = {
        remove: o(u),
        removeSync: y
      };
    }
  ),
  /***/
  619: (
    /***/
    (m, k, r) => {
      const e = r(982);
      const o = r(928);
      const u = r(201).fromPromise;
      function y(c, a, g) {
        const S = g.dereference ? (t) => e.stat(t, { bigint: true }) : (t) => e.lstat(t, { bigint: true });
        return Promise.all([
          S(c),
          S(a).catch((t) => {
            if (t.code === "ENOENT")
              return null;
            throw t;
          })
        ]).then(([t, i]) => ({ srcStat: t, destStat: i }));
      }
      function d(c, a, g) {
        let S;
        const t = g.dereference ? (f) => e.statSync(f, { bigint: true }) : (f) => e.lstatSync(f, { bigint: true });
        const i = t(c);
        try {
          S = t(a);
        } catch (f) {
          if (f.code === "ENOENT")
            return { srcStat: i, destStat: null };
          throw f;
        }
        return { srcStat: i, destStat: S };
      }
      async function s(c, a, g, S) {
        const { srcStat: t, destStat: i } = await y(c, a, S);
        if (i) {
          if (p(t, i)) {
            const f = o.basename(c);
            const l = o.basename(a);
            if (g === "move" && f !== l && f.toLowerCase() === l.toLowerCase()) {
              return { srcStat: t, destStat: i, isChangingCase: true };
            }
            throw new Error("Source and destination must not be the same.");
          }
          if (t.isDirectory() && !i.isDirectory()) {
            throw new Error(`Cannot overwrite non-directory '${a}' with directory '${c}'.`);
          }
          if (!t.isDirectory() && i.isDirectory()) {
            throw new Error(`Cannot overwrite directory '${a}' with non-directory '${c}'.`);
          }
        }
        if (t.isDirectory() && O(c, a)) {
          throw new Error(w(c, a, g));
        }
        return { srcStat: t, destStat: i };
      }
      function n(c, a, g, S) {
        const { srcStat: t, destStat: i } = d(c, a, S);
        if (i) {
          if (p(t, i)) {
            const f = o.basename(c);
            const l = o.basename(a);
            if (g === "move" && f !== l && f.toLowerCase() === l.toLowerCase()) {
              return { srcStat: t, destStat: i, isChangingCase: true };
            }
            throw new Error("Source and destination must not be the same.");
          }
          if (t.isDirectory() && !i.isDirectory()) {
            throw new Error(`Cannot overwrite non-directory '${a}' with directory '${c}'.`);
          }
          if (!t.isDirectory() && i.isDirectory()) {
            throw new Error(`Cannot overwrite directory '${a}' with non-directory '${c}'.`);
          }
        }
        if (t.isDirectory() && O(c, a)) {
          throw new Error(w(c, a, g));
        }
        return { srcStat: t, destStat: i };
      }
      async function P(c, a, g, S) {
        const t = o.resolve(o.dirname(c));
        const i = o.resolve(o.dirname(g));
        if (i === t || i === o.parse(i).root)
          return;
        let f;
        try {
          f = await e.stat(i, { bigint: true });
        } catch (l) {
          if (l.code === "ENOENT")
            return;
          throw l;
        }
        if (p(a, f)) {
          throw new Error(w(c, g, S));
        }
        return P(c, a, i, S);
      }
      function x(c, a, g, S) {
        const t = o.resolve(o.dirname(c));
        const i = o.resolve(o.dirname(g));
        if (i === t || i === o.parse(i).root)
          return;
        let f;
        try {
          f = e.statSync(i, { bigint: true });
        } catch (l) {
          if (l.code === "ENOENT")
            return;
          throw l;
        }
        if (p(a, f)) {
          throw new Error(w(c, g, S));
        }
        return x(c, a, i, S);
      }
      function p(c, a) {
        return a.ino && a.dev && a.ino === c.ino && a.dev === c.dev;
      }
      function O(c, a) {
        const g = o.resolve(c).split(o.sep).filter((t) => t);
        const S = o.resolve(a).split(o.sep).filter((t) => t);
        return g.every((t, i) => S[i] === t);
      }
      function w(c, a, g) {
        return `Cannot ${g} '${c}' to a subdirectory of itself, '${a}'.`;
      }
      m.exports = {
        // checkPaths
        checkPaths: u(s),
        checkPathsSync: n,
        // checkParent
        checkParentPaths: u(P),
        checkParentPathsSync: x,
        // Misc
        isSrcSubdir: O,
        areIdentical: p
      };
    }
  ),
  /***/
  490: (
    /***/
    (m, k, r) => {
      const e = r(982);
      const o = r(201).fromPromise;
      async function u(d, s, n) {
        const P = await e.open(d, "r+");
        let x = null;
        try {
          await e.futimes(P, s, n);
        } finally {
          try {
            await e.close(P);
          } catch (p) {
            x = p;
          }
        }
        if (x) {
          throw x;
        }
      }
      function y(d, s, n) {
        const P = e.openSync(d, "r+");
        e.futimesSync(P, s, n);
        return e.closeSync(P);
      }
      m.exports = {
        utimesMillis: o(u),
        utimesMillisSync: y
      };
    }
  ),
  /***/
  696: (
    /***/
    (m) => {
      m.exports = r;
      var k = Object.getPrototypeOf || function(e) {
        return e.__proto__;
      };
      function r(e) {
        if (e === null || typeof e !== "object")
          return e;
        if (e instanceof Object)
          var o = { __proto__: k(e) };
        else
          var o = /* @__PURE__ */ Object.create(null);
        Object.getOwnPropertyNames(e).forEach(function(u) {
          Object.defineProperty(o, u, Object.getOwnPropertyDescriptor(e, u));
        });
        return o;
      }
    }
  ),
  /***/
  916: (
    /***/
    (m, k, r) => {
      var e = r(896);
      var o = r(593);
      var u = r(90);
      var y = r(696);
      var d = r(23);
      var s;
      var n;
      if (typeof Symbol === "function" && typeof Symbol.for === "function") {
        s = Symbol.for("graceful-fs.queue");
        n = Symbol.for("graceful-fs.previous");
      } else {
        s = "___graceful-fs.queue";
        n = "___graceful-fs.previous";
      }
      function P() {
      }
      function x(t, i) {
        Object.defineProperty(t, s, {
          get: function() {
            return i;
          }
        });
      }
      var p = P;
      if (d.debuglog)
        p = d.debuglog("gfs4");
      else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
        p = function() {
          var t = d.format.apply(d, arguments);
          t = "GFS4: " + t.split(/\n/).join("\nGFS4: ");
          console.error(t);
        };
      if (!e[s]) {
        var O = global[s] || [];
        x(e, O);
        e.close = function(t) {
          function i(f, l) {
            return t.call(e, f, function(F) {
              if (!F) {
                g();
              }
              if (typeof l === "function")
                l.apply(this, arguments);
            });
          }
          Object.defineProperty(i, n, {
            value: t
          });
          return i;
        }(e.close);
        e.closeSync = function(t) {
          function i(f) {
            t.apply(e, arguments);
            g();
          }
          Object.defineProperty(i, n, {
            value: t
          });
          return i;
        }(e.closeSync);
        if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
          process.on("exit", function() {
            p(e[s]);
            r(613).equal(e[s].length, 0);
          });
        }
      }
      if (!global[s]) {
        x(global, e[s]);
      }
      m.exports = w(y(e));
      if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !e.__patched) {
        m.exports = w(e);
        e.__patched = true;
      }
      function w(t) {
        o(t);
        t.gracefulify = w;
        t.createReadStream = nt;
        t.createWriteStream = rt;
        var i = t.readFile;
        t.readFile = f;
        function f(N, b, L) {
          if (typeof b === "function")
            L = b, b = null;
          return A(N, b, L);
          function A(M, W, j, R) {
            return i(M, W, function($) {
              if ($ && ($.code === "EMFILE" || $.code === "ENFILE"))
                c([A, [M, W, j], $, R || Date.now(), Date.now()]);
              else {
                if (typeof j === "function")
                  j.apply(this, arguments);
              }
            });
          }
        }
        var l = t.writeFile;
        t.writeFile = F;
        function F(N, b, L, A) {
          if (typeof L === "function")
            A = L, L = null;
          return M(N, b, L, A);
          function M(W, j, R, $, J) {
            return l(W, j, R, function(I) {
              if (I && (I.code === "EMFILE" || I.code === "ENFILE"))
                c([M, [W, j, R, $], I, J || Date.now(), Date.now()]);
              else {
                if (typeof $ === "function")
                  $.apply(this, arguments);
              }
            });
          }
        }
        var h = t.appendFile;
        if (h)
          t.appendFile = v;
        function v(N, b, L, A) {
          if (typeof L === "function")
            A = L, L = null;
          return M(N, b, L, A);
          function M(W, j, R, $, J) {
            return h(W, j, R, function(I) {
              if (I && (I.code === "EMFILE" || I.code === "ENFILE"))
                c([M, [W, j, R, $], I, J || Date.now(), Date.now()]);
              else {
                if (typeof $ === "function")
                  $.apply(this, arguments);
              }
            });
          }
        }
        var E = t.copyFile;
        if (E)
          t.copyFile = D;
        function D(N, b, L, A) {
          if (typeof L === "function") {
            A = L;
            L = 0;
          }
          return M(N, b, L, A);
          function M(W, j, R, $, J) {
            return E(W, j, R, function(I) {
              if (I && (I.code === "EMFILE" || I.code === "ENFILE"))
                c([M, [W, j, R, $], I, J || Date.now(), Date.now()]);
              else {
                if (typeof $ === "function")
                  $.apply(this, arguments);
              }
            });
          }
        }
        var C = t.readdir;
        t.readdir = Y;
        var T = /^v[0-5]\./;
        function Y(N, b, L) {
          if (typeof b === "function")
            L = b, b = null;
          var A = T.test(process.version) ? function W(j, R, $, J) {
            return C(j, M(
              j,
              R,
              $,
              J
            ));
          } : function W(j, R, $, J) {
            return C(j, R, M(
              j,
              R,
              $,
              J
            ));
          };
          return A(N, b, L);
          function M(W, j, R, $) {
            return function(J, I) {
              if (J && (J.code === "EMFILE" || J.code === "ENFILE"))
                c([
                  A,
                  [W, j, R],
                  J,
                  $ || Date.now(),
                  Date.now()
                ]);
              else {
                if (I && I.sort)
                  I.sort();
                if (typeof R === "function")
                  R.call(this, J, I);
              }
            };
          }
        }
        if (process.version.substr(0, 4) === "v0.8") {
          var V = u(t);
          B = V.ReadStream;
          U = V.WriteStream;
        }
        var Q = t.ReadStream;
        if (Q) {
          B.prototype = Object.create(Q.prototype);
          B.prototype.open = tt;
        }
        var X = t.WriteStream;
        if (X) {
          U.prototype = Object.create(X.prototype);
          U.prototype.open = et;
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
        function B(N, b) {
          if (this instanceof B)
            return Q.apply(this, arguments), this;
          else
            return B.apply(Object.create(B.prototype), arguments);
        }
        function tt() {
          var N = this;
          z(N.path, N.flags, N.mode, function(b, L) {
            if (b) {
              if (N.autoClose)
                N.destroy();
              N.emit("error", b);
            } else {
              N.fd = L;
              N.emit("open", L);
              N.read();
            }
          });
        }
        function U(N, b) {
          if (this instanceof U)
            return X.apply(this, arguments), this;
          else
            return U.apply(Object.create(U.prototype), arguments);
        }
        function et() {
          var N = this;
          z(N.path, N.flags, N.mode, function(b, L) {
            if (b) {
              N.destroy();
              N.emit("error", b);
            } else {
              N.fd = L;
              N.emit("open", L);
            }
          });
        }
        function nt(N, b) {
          return new t.ReadStream(N, b);
        }
        function rt(N, b) {
          return new t.WriteStream(N, b);
        }
        var it = t.open;
        t.open = z;
        function z(N, b, L, A) {
          if (typeof L === "function")
            A = L, L = null;
          return M(N, b, L, A);
          function M(W, j, R, $, J) {
            return it(W, j, R, function(I, at) {
              if (I && (I.code === "EMFILE" || I.code === "ENFILE"))
                c([M, [W, j, R, $], I, J || Date.now(), Date.now()]);
              else {
                if (typeof $ === "function")
                  $.apply(this, arguments);
              }
            });
          }
        }
        return t;
      }
      function c(t) {
        p("ENQUEUE", t[0].name, t[1]);
        e[s].push(t);
        S();
      }
      var a;
      function g() {
        var t = Date.now();
        for (var i = 0; i < e[s].length; ++i) {
          if (e[s][i].length > 2) {
            e[s][i][3] = t;
            e[s][i][4] = t;
          }
        }
        S();
      }
      function S() {
        clearTimeout(a);
        a = void 0;
        if (e[s].length === 0)
          return;
        var t = e[s].shift();
        var i = t[0];
        var f = t[1];
        var l = t[2];
        var F = t[3];
        var h = t[4];
        if (F === void 0) {
          p("RETRY", i.name, f);
          i.apply(null, f);
        } else if (Date.now() - F >= 6e4) {
          p("TIMEOUT", i.name, f);
          var v = f.pop();
          if (typeof v === "function")
            v.call(null, l);
        } else {
          var E = Date.now() - h;
          var D = Math.max(h - F, 1);
          var C = Math.min(D * 1.2, 100);
          if (E >= C) {
            p("RETRY", i.name, f);
            i.apply(null, f.concat([F]));
          } else {
            e[s].push(t);
          }
        }
        if (a === void 0) {
          a = setTimeout(S, 0);
        }
      }
    }
  ),
  /***/
  90: (
    /***/
    (m, k, r) => {
      var e = r(203).Stream;
      m.exports = o;
      function o(u) {
        return {
          ReadStream: y,
          WriteStream: d
        };
        function y(s, n) {
          if (!(this instanceof y))
            return new y(s, n);
          e.call(this);
          var P = this;
          this.path = s;
          this.fd = null;
          this.readable = true;
          this.paused = false;
          this.flags = "r";
          this.mode = 438;
          this.bufferSize = 64 * 1024;
          n = n || {};
          var x = Object.keys(n);
          for (var p = 0, O = x.length; p < O; p++) {
            var w = x[p];
            this[w] = n[w];
          }
          if (this.encoding)
            this.setEncoding(this.encoding);
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
          u.open(this.path, this.flags, this.mode, function(c, a) {
            if (c) {
              P.emit("error", c);
              P.readable = false;
              return;
            }
            P.fd = a;
            P.emit("open", a);
            P._read();
          });
        }
        function d(s, n) {
          if (!(this instanceof d))
            return new d(s, n);
          e.call(this);
          this.path = s;
          this.fd = null;
          this.writable = true;
          this.flags = "w";
          this.encoding = "binary";
          this.mode = 438;
          this.bytesWritten = 0;
          n = n || {};
          var P = Object.keys(n);
          for (var x = 0, p = P.length; x < p; x++) {
            var O = P[x];
            this[O] = n[O];
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
            this._open = u.open;
            this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
            this.flush();
          }
        }
      }
    }
  ),
  /***/
  593: (
    /***/
    (m, k, r) => {
      var e = r(140);
      var o = process.cwd;
      var u = null;
      var y = process.env.GRACEFUL_FS_PLATFORM || process.platform;
      process.cwd = function() {
        if (!u)
          u = o.call(process);
        return u;
      };
      try {
        process.cwd();
      } catch (n) {
      }
      if (typeof process.chdir === "function") {
        var d = process.chdir;
        process.chdir = function(n) {
          u = null;
          d.call(process, n);
        };
        if (Object.setPrototypeOf)
          Object.setPrototypeOf(process.chdir, d);
      }
      m.exports = s;
      function s(n) {
        if (e.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
          P(n);
        }
        if (!n.lutimes) {
          x(n);
        }
        n.chown = w(n.chown);
        n.fchown = w(n.fchown);
        n.lchown = w(n.lchown);
        n.chmod = p(n.chmod);
        n.fchmod = p(n.fchmod);
        n.lchmod = p(n.lchmod);
        n.chownSync = c(n.chownSync);
        n.fchownSync = c(n.fchownSync);
        n.lchownSync = c(n.lchownSync);
        n.chmodSync = O(n.chmodSync);
        n.fchmodSync = O(n.fchmodSync);
        n.lchmodSync = O(n.lchmodSync);
        n.stat = a(n.stat);
        n.fstat = a(n.fstat);
        n.lstat = a(n.lstat);
        n.statSync = g(n.statSync);
        n.fstatSync = g(n.fstatSync);
        n.lstatSync = g(n.lstatSync);
        if (n.chmod && !n.lchmod) {
          n.lchmod = function(t, i, f) {
            if (f)
              process.nextTick(f);
          };
          n.lchmodSync = function() {
          };
        }
        if (n.chown && !n.lchown) {
          n.lchown = function(t, i, f, l) {
            if (l)
              process.nextTick(l);
          };
          n.lchownSync = function() {
          };
        }
        if (y === "win32") {
          n.rename = typeof n.rename !== "function" ? n.rename : function(t) {
            function i(f, l, F) {
              var h = Date.now();
              var v = 0;
              t(f, l, function E(D) {
                if (D && (D.code === "EACCES" || D.code === "EPERM" || D.code === "EBUSY") && Date.now() - h < 6e4) {
                  setTimeout(function() {
                    n.stat(l, function(C, T) {
                      if (C && C.code === "ENOENT")
                        t(f, l, E);
                      else
                        F(D);
                    });
                  }, v);
                  if (v < 100)
                    v += 10;
                  return;
                }
                if (F)
                  F(D);
              });
            }
            if (Object.setPrototypeOf)
              Object.setPrototypeOf(i, t);
            return i;
          }(n.rename);
        }
        n.read = typeof n.read !== "function" ? n.read : function(t) {
          function i(f, l, F, h, v, E) {
            var D;
            if (E && typeof E === "function") {
              var C = 0;
              D = function(T, Y, V) {
                if (T && T.code === "EAGAIN" && C < 10) {
                  C++;
                  return t.call(n, f, l, F, h, v, D);
                }
                E.apply(this, arguments);
              };
            }
            return t.call(n, f, l, F, h, v, D);
          }
          if (Object.setPrototypeOf)
            Object.setPrototypeOf(i, t);
          return i;
        }(n.read);
        n.readSync = typeof n.readSync !== "function" ? n.readSync : /* @__PURE__ */ function(t) {
          return function(i, f, l, F, h) {
            var v = 0;
            while (true) {
              try {
                return t.call(n, i, f, l, F, h);
              } catch (E) {
                if (E.code === "EAGAIN" && v < 10) {
                  v++;
                  continue;
                }
                throw E;
              }
            }
          };
        }(n.readSync);
        function P(t) {
          t.lchmod = function(i, f, l) {
            t.open(
              i,
              e.O_WRONLY | e.O_SYMLINK,
              f,
              function(F, h) {
                if (F) {
                  if (l)
                    l(F);
                  return;
                }
                t.fchmod(h, f, function(v) {
                  t.close(h, function(E) {
                    if (l)
                      l(v || E);
                  });
                });
              }
            );
          };
          t.lchmodSync = function(i, f) {
            var l = t.openSync(i, e.O_WRONLY | e.O_SYMLINK, f);
            var F = true;
            var h;
            try {
              h = t.fchmodSync(l, f);
              F = false;
            } finally {
              if (F) {
                try {
                  t.closeSync(l);
                } catch (v) {
                }
              } else {
                t.closeSync(l);
              }
            }
            return h;
          };
        }
        function x(t) {
          if (e.hasOwnProperty("O_SYMLINK") && t.futimes) {
            t.lutimes = function(i, f, l, F) {
              t.open(i, e.O_SYMLINK, function(h, v) {
                if (h) {
                  if (F)
                    F(h);
                  return;
                }
                t.futimes(v, f, l, function(E) {
                  t.close(v, function(D) {
                    if (F)
                      F(E || D);
                  });
                });
              });
            };
            t.lutimesSync = function(i, f, l) {
              var F = t.openSync(i, e.O_SYMLINK);
              var h;
              var v = true;
              try {
                h = t.futimesSync(F, f, l);
                v = false;
              } finally {
                if (v) {
                  try {
                    t.closeSync(F);
                  } catch (E) {
                  }
                } else {
                  t.closeSync(F);
                }
              }
              return h;
            };
          } else if (t.futimes) {
            t.lutimes = function(i, f, l, F) {
              if (F)
                process.nextTick(F);
            };
            t.lutimesSync = function() {
            };
          }
        }
        function p(t) {
          if (!t)
            return t;
          return function(i, f, l) {
            return t.call(n, i, f, function(F) {
              if (S(F))
                F = null;
              if (l)
                l.apply(this, arguments);
            });
          };
        }
        function O(t) {
          if (!t)
            return t;
          return function(i, f) {
            try {
              return t.call(n, i, f);
            } catch (l) {
              if (!S(l))
                throw l;
            }
          };
        }
        function w(t) {
          if (!t)
            return t;
          return function(i, f, l, F) {
            return t.call(n, i, f, l, function(h) {
              if (S(h))
                h = null;
              if (F)
                F.apply(this, arguments);
            });
          };
        }
        function c(t) {
          if (!t)
            return t;
          return function(i, f, l) {
            try {
              return t.call(n, i, f, l);
            } catch (F) {
              if (!S(F))
                throw F;
            }
          };
        }
        function a(t) {
          if (!t)
            return t;
          return function(i, f, l) {
            if (typeof f === "function") {
              l = f;
              f = null;
            }
            function F(h, v) {
              if (v) {
                if (v.uid < 0)
                  v.uid += 4294967296;
                if (v.gid < 0)
                  v.gid += 4294967296;
              }
              if (l)
                l.apply(this, arguments);
            }
            return f ? t.call(n, i, f, F) : t.call(n, i, F);
          };
        }
        function g(t) {
          if (!t)
            return t;
          return function(i, f) {
            var l = f ? t.call(n, i, f) : t.call(n, i);
            if (l) {
              if (l.uid < 0)
                l.uid += 4294967296;
              if (l.gid < 0)
                l.gid += 4294967296;
            }
            return l;
          };
        }
        function S(t) {
          if (!t)
            return true;
          if (t.code === "ENOSYS")
            return true;
          var i = !process.getuid || process.getuid() !== 0;
          if (i) {
            if (t.code === "EINVAL" || t.code === "EPERM")
              return true;
          }
          return false;
        }
      }
    }
  ),
  /***/
  759: (
    /***/
    (m, k, r) => {
      let e;
      try {
        e = r(916);
      } catch (w) {
        e = r(896);
      }
      const o = r(201);
      const { stringify: u, stripBom: y } = r(733);
      async function d(w, c = {}) {
        if (typeof c === "string") {
          c = { encoding: c };
        }
        const a = c.fs || e;
        const g = "throws" in c ? c.throws : true;
        let S = await o.fromCallback(a.readFile)(w, c);
        S = y(S);
        let t;
        try {
          t = JSON.parse(S, c ? c.reviver : null);
        } catch (i) {
          if (g) {
            i.message = `${w}: ${i.message}`;
            throw i;
          } else {
            return null;
          }
        }
        return t;
      }
      const s = o.fromPromise(d);
      function n(w, c = {}) {
        if (typeof c === "string") {
          c = { encoding: c };
        }
        const a = c.fs || e;
        const g = "throws" in c ? c.throws : true;
        try {
          let S = a.readFileSync(w, c);
          S = y(S);
          return JSON.parse(S, c.reviver);
        } catch (S) {
          if (g) {
            S.message = `${w}: ${S.message}`;
            throw S;
          } else {
            return null;
          }
        }
      }
      async function P(w, c, a = {}) {
        const g = a.fs || e;
        const S = u(c, a);
        await o.fromCallback(g.writeFile)(w, S, a);
      }
      const x = o.fromPromise(P);
      function p(w, c, a = {}) {
        const g = a.fs || e;
        const S = u(c, a);
        return g.writeFileSync(w, S, a);
      }
      const O = {
        readFile: s,
        readFileSync: n,
        writeFile: x,
        writeFileSync: p
      };
      m.exports = O;
    }
  ),
  /***/
  733: (
    /***/
    (m) => {
      function k(e, { EOL: o = "\n", finalEOL: u = true, replacer: y = null, spaces: d } = {}) {
        const s = u ? o : "";
        const n = JSON.stringify(e, y, d);
        return n.replace(/\n/g, o) + s;
      }
      function r(e) {
        if (Buffer.isBuffer(e))
          e = e.toString("utf8");
        return e.replace(/^\uFEFF/, "");
      }
      m.exports = { stringify: k, stripBom: r };
    }
  ),
  /***/
  201: (
    /***/
    (m, k) => {
      k.fromCallback = function(r) {
        return Object.defineProperty(function(...e) {
          if (typeof e[e.length - 1] === "function")
            r.apply(this, e);
          else {
            return new Promise((o, u) => {
              e.push((y, d) => y != null ? u(y) : o(d));
              r.apply(this, e);
            });
          }
        }, "name", { value: r.name });
      };
      k.fromPromise = function(r) {
        return Object.defineProperty(function(...e) {
          const o = e[e.length - 1];
          if (typeof o !== "function")
            return r.apply(this, e);
          else {
            e.pop();
            r.apply(this, e).then((u) => o(null, u), o);
          }
        }, "name", { value: r.name });
      };
    }
  ),
  /***/
  613: (
    /***/
    (m) => {
      m.exports = G(import.meta.url)("assert");
    }
  ),
  /***/
  140: (
    /***/
    (m) => {
      m.exports = G(import.meta.url)("constants");
    }
  ),
  /***/
  896: (
    /***/
    (m) => {
      m.exports = G(import.meta.url)("fs");
    }
  ),
  /***/
  928: (
    /***/
    (m) => {
      m.exports = G(import.meta.url)("path");
    }
  ),
  /***/
  203: (
    /***/
    (m) => {
      m.exports = G(import.meta.url)("stream");
    }
  ),
  /***/
  23: (
    /***/
    (m) => {
      m.exports = G(import.meta.url)("util");
    }
  )
  /******/
};
var q = {};
function K(m) {
  var k = q[m];
  if (k !== void 0) {
    return k.exports;
  }
  var r = q[m] = {
    /******/
    // no module.id needed
    /******/
    // no module.loaded needed
    /******/
    exports: {}
    /******/
  };
  ot[m](r, r.exports, K);
  return r.exports;
}
(() => {
  K.d = (m, k) => {
    for (var r in k) {
      if (K.o(k, r) && !K.o(m, r)) {
        Object.defineProperty(m, r, { enumerable: true, get: k[r] });
      }
    }
  };
})();
(() => {
  K.o = (m, k) => Object.prototype.hasOwnProperty.call(m, k);
})();
var _ = {};
(() => {
  K.d(_, {
    /* harmony export */
    A: () => r
    /* harmony export */
  });
  var m = K(804);
  const k = function(e = { from: "app/public/src", to: "app/build/src" }) {
    if (Array.isArray(e)) {
      this.list = e;
    } else {
      this.list = [
        {
          from: e.from,
          to: e.to
        }
      ];
    }
  };
  k.prototype.apply = function(e) {
    e.hooks.done.tap("CopyFilePlugin", ({ compilation: o }) => {
      if (!o.errors.length) {
        this.list.map(({ from: u, to: y, isDef: d }) => {
          m.copy(u, y, (s) => {
            if (s && !d) {
              console.warn(`Copy File Error: ${s.message}`);
            }
          });
        });
      }
    });
  };
  const r = k;
})();
var ct = _.A;
export {
  ct as default
};
