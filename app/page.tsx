"use client";

import { useMemo, useState } from "react";
import {
  BadgeDollarSign, Banknote, Beef, BookOpen, Bot, Building2, Check, ChefHat,
  ChevronRight, CircleHelp, Clock3, Crown, GraduationCap, Info, Megaphone,
  Menu, PackageOpen, Pizza, Play, RefreshCw, Sparkles, Store, Users, X,
} from "lucide-react";
import {
  EMPLOYEES, ENTRY_EMPLOYEES, PHASE_COPY, advance, capacity,
  cloneGame, hire, initialGame, market, openSlots, price, produce, toggleActive,
  train, type Employee, type GameState, type Good,
} from "./game";

const goodMeta: Record<Good, { label: string; icon: typeof Beef; color: string }> = {
  burger: { label: "Burger", icon: Beef, color: "#c64b35" },
  pizza: { label: "Pizza", icon: Pizza, color: "#d68b1d" },
  soda: { label: "Soda", icon: Sparkles, color: "#2784a6" },
};

function EmployeeCard({ employee, active, selected, compact, onClick }: { employee: Employee; active?: boolean; selected?: boolean; compact?: boolean; onClick?: () => void }) {
  const Icon = employee.track === "kitchen" ? ChefHat : employee.track === "marketing" ? Megaphone : employee.track === "training" ? GraduationCap : employee.track === "management" ? Users : employee.track === "pricing" ? BadgeDollarSign : employee.track === "buyer" ? PackageOpen : employee.track === "recruiting" ? Users : Store;
  return (
    <button className={`employee-card ${active ? "is-active" : ""} ${selected ? "is-selected" : ""} ${compact ? "is-compact" : ""}`} onClick={onClick} disabled={!onClick} title={employee.description}>
      <span className="employee-icon"><Icon size={16} /></span>
      <span className="employee-copy"><strong>{employee.name}</strong><small>{employee.description}</small></span>
      <span className="employee-flags">{employee.salary && <b title="Salary: $5">$5</b>}{employee.slots && <b title={`${employee.slots} management slots`}>+{employee.slots}</b>}</span>
      {active && <span className="working-dot" title="At work"><Check size={12} /></span>}
    </button>
  );
}

function GoodPill({ good, count }: { good: Good; count?: number }) {
  const { icon: Icon, label, color } = goodMeta[good];
  return <span className="good-pill" style={{ "--good": color } as React.CSSProperties}><Icon size={13} />{count === undefined ? label : count}</span>;
}

function Board({ game, onSelectHouse }: { game: GameState; onSelectHouse: (id: number) => void }) {
  return (
    <section className="board-wrap" aria-label="City board">
      <div className="board-grid">
        {Array.from({ length: 108 }, (_, index) => <div key={index} className={(Math.floor(index / 12) % 3 === 2 || index % 3 === 2) ? "road-cell" : "city-cell"} />)}
        {game.houses.map((house) => (
          <button key={house.id} className={`house ${house.garden ? "has-garden" : ""} ${game.selectedHouse === house.id ? "selected" : ""}`} style={{ left: `${house.x * 8.333 + 1}%`, top: `${house.y * 11.111 + 1}%` }} onClick={() => onSelectHouse(house.id)} aria-label={`House ${house.id}, demand ${house.demand.join(", ") || "none"}`}>
            <span className="house-number">{house.id}</span>
            <Building2 size={22} />
            {house.garden && <span className="garden">garden</span>}
            <span className="demand-row">{house.demand.map((good, index) => { const Icon = goodMeta[good].icon; return <i key={`${good}-${index}`} style={{ background: goodMeta[good].color }}><Icon size={9} /></i>; })}</span>
          </button>
        ))}
        {game.players.map((player) => (
          <div key={player.id} className="restaurant" style={{ left: `${player.restaurant.x * 8.333 + 1}%`, top: `${player.restaurant.y * 11.111 + 2}%`, "--chain": player.color } as React.CSSProperties} title={`${player.chain} restaurant`}>
            <Store size={19} /><span>{player.id === 0 ? "YOU" : player.chain.split(" ")[0]}</span>
          </div>
        ))}
        {game.campaigns.map((campaign, index) => {
          const house = game.houses.find((item) => item.id === campaign.houseId)!;
          const Icon = goodMeta[campaign.good].icon;
          return <div key={campaign.id} className="campaign-marker" style={{ left: `${house.x * 8.333 + 5 + (index % 2) * 2}%`, top: `${house.y * 11.111 - 2}%`, background: game.players[campaign.playerId].color }} title={`${game.players[campaign.playerId].chain}: ${campaign.good} campaign`}><Megaphone size={11} /><Icon size={11} /></div>;
        })}
      </div>
      <div className="board-legend"><span><i className="road-swatch" />Road</span><span><Building2 size={13} />House</span><span><Megaphone size={13} />Campaign</span><span className="legend-tip">Select a house to inspect or target it.</span></div>
    </section>
  );
}

function PlayerStrip({ game }: { game: GameState }) {
  return <div className="player-strip">{game.turnOrder.map((id, index) => { const player = game.players[id]; return <div key={id} className={`player-chip ${id === 0 ? "you" : ""}`} style={{ "--chain": player.color } as React.CSSProperties}><span className="order-number">{index + 1}</span><span className="chain-mark"><Store size={15} /></span><span><strong>{player.chain}</strong><small>{id === 0 ? "You" : `Bot · ${player.name}`}</small></span><b>${player.cash}</b><span className="stock-mini"><GoodPill good="burger" count={player.stock.burger} /><GoodPill good="pizza" count={player.stock.pizza} /><GoodPill good="soda" count={player.stock.soda} /></span></div>; })}</div>;
}

function PhaseRail({ game, mutate, openRules }: { game: GameState; mutate: (fn: (next: GameState) => void) => void; openRules: () => void }) {
  const phase = PHASE_COPY[game.phase];
  const player = game.players[0];
  const winner = [...game.players].sort((a, b) => b.cash - a.cash)[0];
  return <aside className="phase-rail">
    <div className="rail-head"><span className="phase-kicker">ROUND {game.round} · PHASE {phase.label}</span><h2>{phase.title}</h2><p>{phase.body}</p></div>
    {game.phase === "gameover" ? <div className="winner-panel"><Crown size={28} /><strong>{winner.chain} wins</strong><span>${winner.cash} cash</span></div> : <div className="next-up"><Clock3 size={16} /><span><small>NOW</small>{game.phase === "work" ? "Your actions are available below" : "Review the board, then continue"}</span></div>}
    {game.selectedHouse && (() => { const house = game.houses.find((item) => item.id === game.selectedHouse)!; return <div className="house-inspector"><div><Building2 size={16} /><strong>House {house.id}</strong>{house.garden && <span>Garden</span>}</div><p>{house.demand.length ? `Wants ${house.demand.join(" + ")}. A chain must have every item.` : "No demand yet. Marketing can create it."}</p><div className="distance-list">{game.players.map((item) => <span key={item.id}><i style={{ background: item.color }} />{item.chain}<b>{Math.abs(item.restaurant.x - house.x) + Math.abs(item.restaurant.y - house.y)}</b></span>)}</div></div>; })()}
    <div className="rule-note"><Info size={16} /><p><strong>Why this matters</strong>{game.phase === "restructure" ? `You have ${capacity(player)} total slots. Leaving slots open improves turn order, but fewer employees will act.` : game.phase === "work" ? `Your current price is $${price(player)}. Stock only survives cleanup after you earn the freezer milestone.` : game.phase === "dinner" ? "A lower menu price can beat a closer restaurant. Ties favor more working waitresses." : game.phase === "marketing" ? "Demand appears after dinner, so advertising prepares customers for a future round." : "The event log records every rule-driven change."}</p></div>
    <button className="primary-action" data-testid="advance-phase" onClick={() => mutate((next) => game.phase === "gameover" ? Object.assign(next, initialGame(next.players[0].reserve)) : advance(next))}>{game.phase === "gameover" ? <RefreshCw size={17} /> : <Play size={17} />}{phase.action}<ChevronRight size={16} /></button>
    <button className="text-action" onClick={openRules}><BookOpen size={15} /> Open rules reference</button>
    <div className="event-log"><div className="section-label"><span>Event log</span><span>Latest first</span></div>{game.log.slice(0, 8).map((event) => <div key={event.id} className={`event ${event.tone ?? ""}`}><i /> <span>{event.text}</span><small>R{event.round}</small></div>)}</div>
  </aside>;
}

function Workbench({ game, mutate }: { game: GameState; mutate: (fn: (next: GameState) => void) => void }) {
  const player = game.players[0];
  const [tab, setTab] = useState<"company" | "hire" | "train" | "produce" | "market">("company");
  const [marketGood, setMarketGood] = useState<Good>("burger");
  const [marketer, setMarketer] = useState<number | null>(null);
  const beach = player.roster.map((id, index) => ({ id, index })).filter((item) => !player.active.includes(item.index));
  const phaseWork = game.phase === "work";
  const tabs = [
    ["company", "Company", Users], ["hire", `Hire · ${game.work.hires}`, Users], ["train", `Train · ${game.work.training}`, GraduationCap],
    ["produce", `Produce · ${game.work.produced.length}`, ChefHat], ["market", `Market · ${game.work.marketed.length}`, Megaphone],
  ] as const;
  return <section className="workbench">
    <div className="workbench-top"><div><span className="section-label">YOUR COMPANY</span><h2>{player.chain}</h2></div><div className="company-stats"><span><Banknote size={15} />Cash <b>${player.cash}</b></span><span>Price <b>${price(player)}</b></span><span>Slots <b>{player.active.length}/{capacity(player)}</b></span><span className="inventory"><GoodPill good="burger" count={player.stock.burger} /><GoodPill good="pizza" count={player.stock.pizza} /><GoodPill good="soda" count={player.stock.soda} /></span></div></div>
    <div className="tabs" role="tablist">{tabs.map(([id, label, Icon]) => <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)} disabled={id !== "company" && !phaseWork}><Icon size={15} />{label}</button>)}</div>
    <div className="workbench-body">
      {tab === "company" && <><div className="org-chart"><div className="ceo-card"><Crown size={18} /><span><strong>CEO</strong><small>Always works · hires 1</small></span><b>3 slots</b></div><div className="employee-grid">{player.roster.length ? player.roster.map((id, index) => <EmployeeCard key={`${id}-${index}`} employee={EMPLOYEES[id]} active={player.active.includes(index)} onClick={game.phase === "restructure" ? () => mutate((next) => toggleActive(next, index)) : undefined} />) : <div className="empty-company"><Users size={24} /><strong>Your CEO is flying solo.</strong><span>Lock the company, then hire an entry-level employee during 9–5.</span></div>}</div></div><div className="tab-help"><CircleHelp size={15} /><span>{game.phase === "restructure" ? `Click employees to put them to work. ${openSlots(player)} slots will remain open.` : "The highlighted cards are working this round. Everyone else is on the beach."}</span></div></>}
      {tab === "hire" && <><div className="employee-grid market-grid">{ENTRY_EMPLOYEES.map((employee) => <EmployeeCard key={employee.id} employee={employee} onClick={game.work.hires > 0 ? () => mutate((next) => hire(next, employee.id)) : undefined} />)}</div><div className="tab-help"><CircleHelp size={15} /><span>New hires go to the beach. They can be trained this turn, but cannot work until next round.</span></div></>}
      {tab === "train" && <><div className="employee-grid">{beach.filter(({ id }) => EMPLOYEES[id].next?.length).map(({ id, index }) => <div key={index} className="training-row"><EmployeeCard employee={EMPLOYEES[id]} compact /><ChevronRight size={15} />{EMPLOYEES[id].next!.map((nextId) => <button key={nextId} onClick={() => mutate((next) => train(next, index, nextId))} disabled={!game.work.training}><GraduationCap size={14} />{EMPLOYEES[nextId].name}</button>)}</div>)}{!beach.some(({ id }) => EMPLOYEES[id].next?.length) && <div className="empty-company"><GraduationCap size={24} /><strong>No one can be trained yet.</strong><span>Hire an entry employee first. Only employees on the beach may train.</span></div>}</div><div className="tab-help"><CircleHelp size={15} /><span>A Trainer gives one step. Coaches and Gurus provide multiple steps.</span></div></>}
      {tab === "produce" && <><div className="production-list">{game.work.produced.map((index) => { const employee = EMPLOYEES[player.roster[index]]; return <div key={index}><EmployeeCard employee={employee} compact />{(Object.keys(employee.produces ?? {}) as Good[]).map((good) => <button key={good} onClick={() => mutate((next) => produce(next, index, good))}><GoodPill good={good} /> Produce {employee.produces![good]}</button>)}</div>; })}{!game.work.produced.length && <div className="empty-company"><ChefHat size={24} /><strong>No unused production actions.</strong><span>Put kitchen staff or drink buyers to work during restructuring.</span></div>}</div><div className="tab-help"><CircleHelp size={15} /><span>You must have the entire order in stock to serve a house. Partial meals are never sold.</span></div></>}
      {tab === "market" && <><div className="market-controls"><span>1. Choose a marketer</span><div>{game.work.marketed.map((index) => <button key={index} className={marketer === index ? "selected" : ""} onClick={() => setMarketer(index)}>{EMPLOYEES[player.roster[index]].name}</button>)}</div><span>2. Choose a product</span><div>{(Object.keys(goodMeta) as Good[]).map((good) => <button key={good} className={marketGood === good ? "selected" : ""} onClick={() => setMarketGood(good)}><GoodPill good={good} /></button>)}</div><span>3. Select a house on the board, then launch</span><button className="launch-button" disabled={marketer === null || game.selectedHouse === null} onClick={() => { if (marketer !== null && game.selectedHouse !== null) { mutate((next) => market(next, marketer, game.selectedHouse!, marketGood)); setMarketer(null); } }}><Megaphone size={16} /> Launch billboard at house {game.selectedHouse ?? "—"}</button></div><div className="tab-help"><CircleHelp size={15} /><span>The first billboard milestone makes your campaigns eternal, but its marketer stays busy for the rest of the game.</span></div></>}
    </div>
  </section>;
}

function StartDialog({ onStart }: { onStart: (reserve: number) => void }) {
  const [reserve, setReserve] = useState(200);
  return <div className="modal-backdrop"><div className="start-dialog"><div className="start-brand"><span className="brand-mark"><Store /></span><div><span>A guided tabletop adaptation</span><h1>Food Chain<br />Magnate</h1></div></div><p className="start-lede">Build a restaurant empire, create demand, and outmaneuver three bot executives. Every phase explains itself while you learn.</p><div className="opponent-row"><span><Bot />Mara<small>Sales-focused</small></span><span><Bot />Otto<small>Pizza specialist</small></span><span><Bot />June<small>Marketing-first</small></span></div><fieldset><legend>Choose your hidden bank reserve</legend><p>This affects how long the game lasts. It is revealed only when the bank first breaks.</p><div className="reserve-options">{[100, 200, 300].map((amount) => <button key={amount} className={reserve === amount ? "selected" : ""} onClick={() => setReserve(amount)}><Banknote />${amount}<small>{amount === 100 ? "Short game" : amount === 200 ? "Balanced" : "Long game"}</small>{reserve === amount && <Check />}</button>)}</div></fieldset><button className="start-button" onClick={() => onStart(reserve)}><Play />Start guided game</button><small className="adaptation-note">Base-game rules · 4 players · Local play</small></div></div>;
}

function RulesDrawer({ onClose }: { onClose: () => void }) {
  return <div className="drawer-backdrop" onClick={onClose}><aside className="rules-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-head"><div><span className="section-label">QUICK REFERENCE</span><h2>How a round works</h2></div><button onClick={onClose} aria-label="Close rules"><X /></button></div>{Object.entries(PHASE_COPY).filter(([id]) => id !== "gameover").map(([id, copy]) => <div className="rule-phase" key={id}><span>{copy.label}</span><div><strong>{copy.title}</strong><p>{copy.body}</p></div></div>)}<div className="rule-callout"><Crown /><div><strong>How you win</strong><p>The bank breaking once extends the game with hidden reserves. When it breaks a second time during dinner, the richest chain wins immediately.</p></div></div><a href="https://www.qugs.org/rules/r175914.pdf" target="_blank" rel="noreferrer">Open the official rulebook <ChevronRight /></a></aside></div>;
}

export default function Home() {
  const [game, setGame] = useState<GameState>(() => initialGame());
  const [rulesOpen, setRulesOpen] = useState(false);
  const mutate = (fn: (next: GameState) => void) => setGame((current) => { const next = cloneGame(current); fn(next); return next; });
  const phase = PHASE_COPY[game.phase];
  const bankPct = Math.max(0, Math.min(100, (game.bank / (game.bankBreaks ? 800 : 200)) * 100));
  const milestones = useMemo(() => game.players[0].milestones, [game.players]);
  return <main>
    <header className="topbar"><div className="brand"><span className="brand-mark"><Store size={20} /></span><div><strong>FOOD CHAIN</strong><span>MAGNATE</span></div></div><div className="round-status"><span>Round <b>{game.round}</b></span><i /><span>{phase.title}</span></div><div className="bank-status"><span><Banknote size={16} />Bank</span><div><i style={{ width: `${bankPct}%` }} /></div><b>${Math.max(0, game.bank)}</b><small>{game.bankBreaks}/2 breaks</small></div><button className="icon-button" aria-label="Open rules" title="Rules" onClick={() => setRulesOpen(true)}><BookOpen size={18} /></button><button className="icon-button mobile-menu" aria-label="Menu"><Menu size={18} /></button></header>
    <div className="game-shell"><div className="main-table"><PlayerStrip game={game} /><Board game={game} onSelectHouse={(id) => mutate((next) => { next.selectedHouse = next.selectedHouse === id ? null : id; })} /><Workbench game={game} mutate={mutate} />{milestones.length > 0 && <section className="milestones"><span className="section-label">YOUR MILESTONES</span>{milestones.map((milestone) => <span key={milestone}><Crown size={13} />{milestone}</span>)}</section>}</div><PhaseRail game={game} mutate={mutate} openRules={() => setRulesOpen(true)} /></div>
    {!game.gameStarted && <StartDialog onStart={(reserve) => setGame({ ...initialGame(reserve), gameStarted: true })} />}
    {rulesOpen && <RulesDrawer onClose={() => setRulesOpen(false)} />}
  </main>;
}
