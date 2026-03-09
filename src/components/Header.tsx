import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

export interface ProjectSession {
  name: string;       // "default", "work", etc.
  unlocked: boolean;
}

interface HeaderProps {
  activeProject: string;
  unlockedProjects: string[];
  onProjectChange: (project: string) => void;
  onUnlockRequest: (project: string, password: string) => Promise<void>;
  onCreateRequest: (name: string, password: string) => Promise<void>;
}

type ModalMode = "unlock" | "create" | null;

export default function Header({
  activeProject,
  unlockedProjects,
  onProjectChange,
  onUnlockRequest,
  onCreateRequest,
}: HeaderProps) {
  const [copied,    setCopied]    = useState(false);
  const [projects,  setProjects]  = useState<string[]>([]);
  const [modal,     setModal]     = useState<ModalMode>(null);
  const [pending,   setPending]   = useState("");        // project being unlocked
  const [password,  setPassword]  = useState("");
  const [newName,   setNewName]   = useState("");
  const [pwVisible, setPwVisible] = useState(false);
  const [error,     setError]     = useState("");
  const [busy,      setBusy]      = useState(false);
  const pwRef = useRef<HTMLInputElement>(null);

  // Fetch project list from backend
  const refreshProjects = () => {
    fetch("/api/v1/projects")
      .then((r) => r.ok ? r.json() : [])
      .then(setProjects)
      .catch(() => setProjects([]));
  };

  useEffect(() => { refreshProjects(); }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("pip install sspwd");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const openUnlock = (project: string) => {
    setPending(project); setPassword(""); setError(""); setModal("unlock");
    setTimeout(() => pwRef.current?.focus(), 50);
  };

  const openCreate = () => {
    setNewName(""); setPassword(""); setError(""); setModal("create");
    setTimeout(() => pwRef.current?.focus(), 50);
  };

  const handleSubmit = async () => {
    if (!password) { setError("Password is required."); return; }
    setBusy(true); setError("");
    try {
      if (modal === "unlock") {
        await onUnlockRequest(pending, password);
        onProjectChange(pending);
      } else {
        if (!newName.trim()) { setError("Project name is required."); setBusy(false); return; }
        await onCreateRequest(newName.trim(), password);
        refreshProjects();
        onProjectChange(newName.trim());
      }
      setModal(null);
    } catch (e: any) {
      setError(e.message || "Failed.");
    } finally {
      setBusy(false);
    }
  };

  const handleSelectChange = (value: string) => {
    if (value === "__create__") { openCreate(); return; }
    if (value === "mock") { onProjectChange("mock"); return; }
    if (unlockedProjects.includes(value)) {
      onProjectChange(value);
    } else {
      openUnlock(value);
    }
  };

  const options: Array<{ value: string; label: string; icon: string; iconClass: string }> = [
    { value: "mock",       label: "mockData",  icon: "si:unlock-fill",          iconClass: "text-white/40" },
    ...projects.map((p) => ({
      value: p,
      label: p,
      icon:      unlockedProjects.includes(p) ? "si:unlock-fill"        : "si:lock-muted-fill",
      iconClass: unlockedProjects.includes(p) ? "text-green-400"        : "text-white/40",
    })),
    { value: "__create__", label: "+ new",     icon: "mdi:folder-plus-outline",  iconClass: "text-white/40" },
  ];

  const activeOption = options.find((o) => o.value === activeProject) ?? options[0];
  const isLive = activeProject !== "mock";
  const [dropOpen, setDropOpen] = useState(false);

  return (
    <>
      <header
        className="relative flex items-center justify-between px-6 py-4 select-none"
        style={{ background: "linear-gradient(to bottom, #1d4ed8, #b91c1c)" }}
      >
        {/* Left — brand */}
        <div className="flex flex-col gap-2">
          <h1 className="text-white font-mono font-bold text-xl md:text-2xl" style={{ letterSpacing: "0.18em" }}>
            sspwd&nbsp;&mdash;&nbsp;super secret password
          </h1>
          <button onClick={handleCopy} className="flex items-center gap-2 w-fit cursor-pointer group" title="Copy">
            <span className="font-mono text-sm bg-black/70 text-white px-3 py-0.5 border border-white/30 rounded-sm">
              pip install sspwd
            </span>
            <Icon icon={copied ? "mdi:check" : "mdi:content-copy"}
              className={`text-white/80 text-base transition-colors ${copied ? "text-green-300" : "group-hover:text-white"}`} />
            {copied && <span className="font-mono text-xs text-green-300 animate-pulse">copied!</span>}
          </button>
        </div>

        {/* Right — project selector */}
        <div className="flex items-center gap-2">
          <Icon icon="mdi:database" className="text-white/60 text-sm shrink-0" />

          <div className="relative">
            {/* Trigger */}
            <button
              onClick={() => setDropOpen((v) => !v)}
              className="flex items-center gap-2 font-mono text-xs text-white bg-black/60 border border-white/30 pl-3 pr-8 py-1.5 rounded-sm hover:bg-black/80 focus:outline-none focus:border-white/60 transition-colors min-w-36"
            >
              <Icon icon={activeOption.icon} className={`text-sm shrink-0 ${activeOption.iconClass}`} />
              <span>{activeOption.label}</span>
            </button>
            <Icon icon="mdi:chevron-down"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 text-sm pointer-events-none" />

            {/* Dropdown list */}
            {dropOpen && (
              <div className="absolute right-0 top-full mt-1 z-50 min-w-full bg-neutral-900 border border-white/20 rounded-sm shadow-2xl overflow-hidden"
                onMouseLeave={() => setDropOpen(false)}>
                {options.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => { setDropOpen(false); handleSelectChange(o.value); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 font-mono text-xs text-left hover:bg-white/10 transition-colors ${
                      o.value === activeProject ? "text-white bg-white/5" : "text-white/70"
                    }`}
                  >
                    <Icon icon={o.icon} className={`text-sm shrink-0 ${o.iconClass}`} />
                    {o.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Show unlock icon + "live" badge next to the active unlocked project */}
          {isLive && (
            <div className="flex items-center gap-1">
              <Icon icon="si:unlock-fill" className="text-green-400 text-sm" />
              <span className="font-mono text-xs text-green-400 border border-green-800 px-2 py-0.5 rounded-sm">
                live
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Unlock / Create modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setModal(null); }}
        >
          <div className="w-full max-w-sm bg-neutral-950 border border-white/15 rounded-sm shadow-2xl"
            style={{ background: "linear-gradient(to bottom, #1d4ed811, #b91c1c11), #0a0a0a" }}>

            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Icon icon={modal === "unlock" ? "si:lock-muted-fill" : "mdi:folder-plus-outline"}
                  className="text-white/60" />
                <h2 className="font-mono font-bold text-white text-sm">
                  {modal === "unlock" ? pending : "New project"}
                </h2>
              </div>
              <button onClick={() => setModal(null)} className="text-white/30 hover:text-white">
                <Icon icon="mdi:close" />
              </button>
            </div>

            <div className="flex flex-col gap-4 px-5 py-5">
              {modal === "create" && (
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs text-white/40 uppercase tracking-widest">Project name</label>
                  <input
                    className={inp}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. work"
                    autoComplete="off"
                    data-lpignore="true"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs text-white/40 uppercase tracking-widest">
                  {modal === "unlock" ? "Enter master password to unlock" : "Set master password"}
                </label>
                <div className="relative">
                  <input
                    ref={pwRef}
                    className={`${inp} pr-8`}
                    type={pwVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    placeholder="••••••••••"
                    autoComplete="current-password"
                  />
                  <button type="button" onClick={() => setPwVisible(v => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                    <Icon icon={pwVisible ? "mdi:eye-off-outline" : "mdi:eye-outline"} className="text-sm" />
                  </button>
                </div>
              </div>

              {error && (
                <p className="font-mono text-xs text-red-400 border border-red-800 px-3 py-2 rounded-sm bg-red-900/20">
                  {error}
                </p>
              )}
            </div>

            <div className="flex gap-2 px-5 py-4 border-t border-white/10">
              <button onClick={() => setModal(null)}
                className="flex-1 font-mono text-xs border border-white/15 text-white/50 hover:text-white rounded-sm py-2 transition-colors">
                Cancel
              </button>
              <button onClick={handleSubmit} disabled={busy}
                className="flex-1 flex items-center justify-center gap-1.5 font-mono text-xs font-semibold bg-blue-700 hover:bg-blue-600 disabled:opacity-40 text-white rounded-sm py-2 transition-colors">
                {busy ? "…" : modal === "unlock"
                  ? <><Icon icon="si:unlock-fill" className="text-sm" />Unlock</>
                  : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const inp = "w-full font-mono text-xs bg-black border border-white/15 text-white placeholder-white/25 px-3 py-2 rounded-sm focus:outline-none focus:border-blue-700 transition-colors";