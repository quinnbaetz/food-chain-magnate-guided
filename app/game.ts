export type Good = "burger" | "pizza" | "soda";
export type Phase =
  | "restructure"
  | "order"
  | "work"
  | "dinner"
  | "payday"
  | "marketing"
  | "cleanup"
  | "gameover";

export type Employee = {
  id: string;
  name: string;
  track: "service" | "management" | "recruiting" | "training" | "kitchen" | "marketing" | "pricing" | "buyer";
  level: number;
  salary: boolean;
  entry?: boolean;
  slots?: number;
  hires?: number;
  training?: number;
  produces?: Partial<Record<Good, number>>;
  marketing?: number;
  price?: number;
  waitress?: number;
  next?: string[];
  description: string;
};

export const EMPLOYEES: Record<string, Employee> = {
  managementTrainee: { id: "managementTrainee", name: "Management Trainee", track: "management", level: 1, salary: false, entry: true, slots: 2, next: ["juniorVP"], description: "Manages up to 2 employees." },
  juniorVP: { id: "juniorVP", name: "Junior Vice President", track: "management", level: 2, salary: true, slots: 3, next: ["vicePresident"], description: "Manages up to 3 employees." },
  vicePresident: { id: "vicePresident", name: "Vice President", track: "management", level: 3, salary: true, slots: 4, next: ["seniorVP"], description: "Manages up to 4 employees." },
  seniorVP: { id: "seniorVP", name: "Senior Vice President", track: "management", level: 4, salary: true, slots: 5, next: ["executiveVP"], description: "Manages up to 5 employees." },
  executiveVP: { id: "executiveVP", name: "Executive Vice President", track: "management", level: 5, salary: true, slots: 10, description: "Manages up to 10 employees." },
  recruitingGirl: { id: "recruitingGirl", name: "Recruiting Girl", track: "recruiting", level: 1, salary: false, entry: true, hires: 1, next: ["recruitingManager"], description: "Hire 1 additional employee." },
  recruitingManager: { id: "recruitingManager", name: "Recruiting Manager", track: "recruiting", level: 2, salary: true, hires: 2, next: ["hrDirector"], description: "Two actions: hire or reduce salary." },
  hrDirector: { id: "hrDirector", name: "HR Director", track: "recruiting", level: 3, salary: true, hires: 4, description: "Four actions: hire or reduce salary." },
  trainer: { id: "trainer", name: "Trainer", track: "training", level: 1, salary: false, entry: true, training: 1, next: ["coach"], description: "Train 1 employee one step." },
  coach: { id: "coach", name: "Coach", track: "training", level: 2, salary: true, training: 2, next: ["guru"], description: "Provides 2 training steps." },
  guru: { id: "guru", name: "Guru", track: "training", level: 3, salary: true, training: 3, description: "Provides 3 training steps." },
  kitchenTrainee: { id: "kitchenTrainee", name: "Kitchen Trainee", track: "kitchen", level: 1, salary: false, entry: true, produces: { burger: 1, pizza: 1 }, next: ["burgerCook", "pizzaCook"], description: "Produce 1 burger or 1 pizza." },
  burgerCook: { id: "burgerCook", name: "Burger Cook", track: "kitchen", level: 2, salary: true, produces: { burger: 3 }, next: ["burgerChef"], description: "Produce 3 burgers." },
  burgerChef: { id: "burgerChef", name: "Burger Chef", track: "kitchen", level: 3, salary: true, produces: { burger: 8 }, description: "Produce 8 burgers." },
  pizzaCook: { id: "pizzaCook", name: "Pizza Cook", track: "kitchen", level: 2, salary: true, produces: { pizza: 3 }, next: ["pizzaChef"], description: "Produce 3 pizzas." },
  pizzaChef: { id: "pizzaChef", name: "Pizza Chef", track: "kitchen", level: 3, salary: true, produces: { pizza: 8 }, description: "Produce 8 pizzas." },
  marketingTrainee: { id: "marketingTrainee", name: "Marketing Trainee", track: "marketing", level: 1, salary: false, entry: true, marketing: 2, next: ["campaignManager"], description: "Run a nearby billboard for up to 2 turns." },
  campaignManager: { id: "campaignManager", name: "Campaign Manager", track: "marketing", level: 2, salary: true, marketing: 3, next: ["brandManager"], description: "Run billboard or mailbox campaigns." },
  brandManager: { id: "brandManager", name: "Brand Manager", track: "marketing", level: 3, salary: true, marketing: 4, next: ["brandDirector"], description: "Run all campaigns except radio." },
  brandDirector: { id: "brandDirector", name: "Brand Director", track: "marketing", level: 4, salary: true, marketing: 5, description: "Run any campaign, including radio." },
  pricingManager: { id: "pricingManager", name: "Pricing Manager", track: "pricing", level: 1, salary: false, entry: true, price: -1, next: ["discountManager", "luxuriesManager"], description: "Mandatory: unit price -$1." },
  discountManager: { id: "discountManager", name: "Discount Manager", track: "pricing", level: 2, salary: true, price: -3, description: "Mandatory: unit price -$3." },
  luxuriesManager: { id: "luxuriesManager", name: "Luxuries Manager", track: "pricing", level: 2, salary: true, price: 10, description: "Mandatory: unit price +$10." },
  waitress: { id: "waitress", name: "Waitress", track: "service", level: 1, salary: false, entry: true, waitress: 1, description: "Earn $3 and break customer ties." },
  errandBoy: { id: "errandBoy", name: "Errand Boy", track: "buyer", level: 1, salary: false, entry: true, produces: { soda: 1 }, next: ["cartOperator"], description: "Collect 1 drink." },
  cartOperator: { id: "cartOperator", name: "Cart Operator", track: "buyer", level: 2, salary: true, produces: { soda: 2 }, next: ["truckDriver"], description: "Collect 2 drinks from each source passed." },
  truckDriver: { id: "truckDriver", name: "Truck Driver", track: "buyer", level: 3, salary: true, produces: { soda: 3 }, description: "Collect 3 drinks from each source passed." },
};

export const ENTRY_EMPLOYEES = Object.values(EMPLOYEES).filter((employee) => employee.entry);

export type Player = {
  id: number;
  name: string;
  chain: string;
  color: string;
  cash: number;
  reserve: number;
  roster: string[];
  active: number[];
  stock: Record<Good, number>;
  milestones: string[];
  restaurant: { x: number; y: number };
};

export type House = { id: number; x: number; y: number; demand: Good[]; garden?: boolean };
export type Campaign = { id: number; playerId: number; houseId: number; good: Good; remaining: number; eternal?: boolean };
export type GameState = {
  round: number;
  phase: Phase;
  bank: number;
  bankBreaks: number;
  players: Player[];
  houses: House[];
  campaigns: Campaign[];
  turnOrder: number[];
  selectedHouse: number | null;
  work: { hires: number; training: number; produced: number[]; marketed: number[] };
  claimed: string[];
  log: { id: number; round: number; text: string; tone?: "good" | "warn" | "bot" }[];
  tutorial: boolean;
  gameStarted: boolean;
};

const houses: House[] = [
  { id: 1, x: 1, y: 1, demand: [] }, { id: 2, x: 4, y: 1, demand: [] },
  { id: 3, x: 7, y: 1, demand: [] }, { id: 4, x: 10, y: 1, demand: [] },
  { id: 5, x: 2, y: 4, demand: [] }, { id: 6, x: 5, y: 4, demand: [], garden: true },
  { id: 7, x: 8, y: 4, demand: [] }, { id: 8, x: 11, y: 4, demand: [] },
  { id: 9, x: 1, y: 7, demand: [] }, { id: 10, x: 4, y: 7, demand: [] },
  { id: 11, x: 7, y: 7, demand: [], garden: true }, { id: 12, x: 10, y: 7, demand: [] },
];

const playerSeeds = [
  ["You", "Golden Spoon", "#c83d2d", 0, 8],
  ["Mara", "Burger Baron", "#167d66", 11, 8],
  ["Otto", "Pizza Palace", "#2766a6", 0, 0],
  ["June", "Soda Shop", "#d58b17", 11, 0],
] as const;

export function initialGame(reserve = 200): GameState {
  return {
    round: 1,
    phase: "restructure",
    bank: 200,
    bankBreaks: 0,
    players: playerSeeds.map(([name, chain, color, x, y], id) => ({
      id, name, chain, color, cash: 0, reserve: id === 0 ? reserve : [100, 300, 200][id - 1],
      roster: [], active: [], stock: { burger: 0, pizza: 0, soda: 0 }, milestones: [], restaurant: { x, y },
    })),
    houses: houses.map((house) => ({ ...house, demand: [...house.demand] })),
    campaigns: [], turnOrder: [0, 1, 2, 3], selectedHouse: null,
    work: { hires: 1, training: 0, produced: [], marketed: [] }, claimed: [],
    log: [{ id: 1, round: 1, text: "Four restaurant chains open for business. Choose your company structure.", tone: "good" }],
    tutorial: true, gameStarted: false,
  };
}

export function cloneGame(game: GameState): GameState {
  return structuredClone(game);
}

export function activeEmployees(player: Player) {
  return player.active.map((index) => ({ index, employee: EMPLOYEES[player.roster[index]] })).filter((item) => item.employee);
}

export function capacity(player: Player) {
  return 3 + activeEmployees(player).reduce((sum, item) => sum + (item.employee.slots ?? 0), 0);
}

export function usedSlots(player: Player) {
  return player.active.length;
}

export function openSlots(player: Player) {
  return Math.max(0, capacity(player) - usedSlots(player));
}

export function price(player: Player) {
  const activePrice = activeEmployees(player).reduce((sum, item) => sum + (item.employee.price ?? 0), 0);
  return Math.max(0, 10 + activePrice + (player.milestones.includes("First to lower prices") ? -1 : 0));
}

function addLog(game: GameState, text: string, tone?: "good" | "warn" | "bot") {
  game.log.unshift({ id: (game.log[0]?.id ?? 0) + 1, round: game.round, text, tone });
  game.log = game.log.slice(0, 40);
}

function award(game: GameState, player: Player, milestone: string) {
  if (game.claimed.includes(milestone)) return;
  game.claimed.push(milestone);
  player.milestones.push(milestone);
  addLog(game, `${player.chain} claims “${milestone}”.`, player.id === 0 ? "good" : "bot");
  if (milestone === "First Burger produced") player.roster.push("burgerCook");
  if (milestone === "First Pizza produced") player.roster.push("pizzaCook");
}

export function recalcWork(game: GameState) {
  const player = game.players[0];
  const active = activeEmployees(player).map((item) => item.employee);
  game.work.hires = 1 + active.reduce((sum, employee) => sum + (employee.hires ?? 0), 0);
  game.work.training = active.reduce((sum, employee) => sum + (employee.training ?? 0), 0);
  game.work.produced = activeEmployees(player).filter((item) => item.employee.produces).map((item) => item.index);
  game.work.marketed = activeEmployees(player).filter((item) => item.employee.marketing).map((item) => item.index);
}

export function toggleActive(game: GameState, rosterIndex: number) {
  const player = game.players[0];
  const position = player.active.indexOf(rosterIndex);
  if (position >= 0) {
    player.active.splice(position, 1);
    while (player.active.length > capacity(player)) player.active.pop();
  } else if (player.active.length < capacity(player)) {
    player.active.push(rosterIndex);
    const employee = EMPLOYEES[player.roster[rosterIndex]];
    if (employee.waitress) award(game, player, "First Waitress played");
    if (employee.price && employee.price < 0) award(game, player, "First to lower prices");
    if (employee.id === "errandBoy") award(game, player, "First Errand Boy played");
  }
  recalcWork(game);
}

export function hire(game: GameState, employeeId: string, playerId = 0) {
  const player = game.players[playerId];
  if (playerId === 0 && game.work.hires <= 0) return;
  player.roster.push(employeeId);
  if (playerId === 0) game.work.hires -= 1;
  addLog(game, `${player.chain} hires ${EMPLOYEES[employeeId].name}.`, playerId === 0 ? "good" : "bot");
}

export function train(game: GameState, rosterIndex: number, nextId: string, playerId = 0) {
  const player = game.players[playerId];
  if (playerId === 0 && (game.work.training <= 0 || player.active.includes(rosterIndex))) return;
  const before = EMPLOYEES[player.roster[rosterIndex]];
  player.roster[rosterIndex] = nextId;
  if (playerId === 0) game.work.training -= 1;
  addLog(game, `${player.chain} trains ${before.name} into ${EMPLOYEES[nextId].name}.`, playerId === 0 ? "good" : "bot");
  award(game, player, "First to train someone");
}

export function produce(game: GameState, rosterIndex: number, good: Good, playerId = 0) {
  const player = game.players[playerId];
  const employee = EMPLOYEES[player.roster[rosterIndex]];
  const amount = employee?.produces?.[good] ?? 0;
  if (!amount || (playerId === 0 && !game.work.produced.includes(rosterIndex))) return;
  player.stock[good] += amount + (good === "soda" && player.milestones.includes("First Errand Boy played") ? 1 : 0);
  if (playerId === 0) game.work.produced = game.work.produced.filter((index) => index !== rosterIndex);
  addLog(game, `${player.chain} produces ${amount} ${good}${amount === 1 ? "" : "s"}.`, playerId === 0 ? "good" : "bot");
  if (good === "burger") award(game, player, "First Burger produced");
  if (good === "pizza") award(game, player, "First Pizza produced");
}

export function market(game: GameState, rosterIndex: number, houseId: number, good: Good, playerId = 0) {
  const player = game.players[playerId];
  const employee = EMPLOYEES[player.roster[rosterIndex]];
  if (!employee?.marketing || (playerId === 0 && !game.work.marketed.includes(rosterIndex))) return;
  const eternal = player.milestones.includes("First Billboard placed") || !game.claimed.includes("First Billboard placed");
  const campaign: Campaign = { id: Math.max(0, ...game.campaigns.map((item) => item.id)) + 1, playerId, houseId, good, remaining: employee.marketing, eternal };
  game.campaigns.push(campaign);
  if (playerId === 0) game.work.marketed = game.work.marketed.filter((index) => index !== rosterIndex);
  award(game, player, "First Billboard placed");
  award(game, player, good === "burger" ? "First Burger marketed" : good === "pizza" ? "First Pizza marketed" : "First Drink marketed");
  addLog(game, `${player.chain} starts a ${good} campaign near house ${houseId}.`, playerId === 0 ? "good" : "bot");
}

function distance(player: Player, house: House) {
  return Math.abs(player.restaurant.x - house.x) + Math.abs(player.restaurant.y - house.y);
}

function payFromBank(game: GameState, player: Player, amount: number) {
  if (amount <= game.bank) {
    game.bank -= amount;
    player.cash += amount;
    return;
  }
  player.cash += amount;
  game.bank -= amount;
}

function handleBankBreak(game: GameState) {
  if (game.bank > 0) return;
  game.bankBreaks += 1;
  if (game.bankBreaks === 1) {
    const reserve = game.players.reduce((sum, player) => sum + player.reserve, 0);
    game.bank += reserve;
    addLog(game, `The bank breaks. Hidden reserves reveal $${reserve}; the game continues.`, "warn");
  } else {
    game.phase = "gameover";
    addLog(game, "The bank breaks for the second time. Payday is skipped; richest chain wins.", "warn");
  }
}

export function resolveDinner(game: GameState) {
  let served = 0;
  for (const house of game.houses) {
    if (!house.demand.length) continue;
    const needed = house.demand.reduce<Record<Good, number>>((total, good) => ({ ...total, [good]: total[good] + 1 }), { burger: 0, pizza: 0, soda: 0 });
    const eligible = game.players.filter((player) => Object.keys(needed).every((good) => player.stock[good as Good] >= needed[good as Good]));
    if (!eligible.length) continue;
    eligible.sort((a, b) => {
      const score = price(a) + distance(a, house) - (price(b) + distance(b, house));
      if (score) return score;
      const waitresses = activeEmployees(b).filter((item) => item.employee.waitress).length - activeEmployees(a).filter((item) => item.employee.waitress).length;
      return waitresses || game.turnOrder.indexOf(a.id) - game.turnOrder.indexOf(b.id);
    });
    const winner = eligible[0];
    for (const good of house.demand) winner.stock[good] -= 1;
    const bonuses = house.demand.reduce((sum, good) => sum + (winner.milestones.includes(good === "soda" ? "First Drink marketed" : `First ${good[0].toUpperCase() + good.slice(1)} marketed`) ? 5 : 0), 0);
    const income = house.demand.length * price(winner) * (house.garden ? 2 : 1) + bonuses;
    payFromBank(game, winner, income);
    addLog(game, `House ${house.id} buys ${house.demand.join(" + ")} from ${winner.chain} for $${income}.`, winner.id === 0 ? "good" : "bot");
    house.demand = [];
    served += 1;
  }
  for (const player of game.players) {
    const waitressCount = activeEmployees(player).filter((item) => item.employee.waitress).length;
    if (waitressCount) payFromBank(game, player, waitressCount * (player.milestones.includes("First Waitress played") ? 5 : 3));
    if (player.cash >= 20) award(game, player, "First to have $20");
  }
  if (!served) addLog(game, "No houses could buy a complete meal this round.", "warn");
  handleBankBreak(game);
}

export function resolvePayday(game: GameState) {
  for (const player of game.players) {
    let salary = activeEmployees(player).filter((item) => item.employee.salary).length * 5;
    salary += player.roster.filter((_, index) => !player.active.includes(index)).filter((id) => EMPLOYEES[id]?.salary).length * 5;
    if (player.milestones.includes("First to train someone")) salary = Math.max(0, salary - 15);
    const paid = Math.min(player.cash, salary);
    player.cash -= paid;
    if (paid) addLog(game, `${player.chain} pays $${paid} in salaries.`, player.id === 0 ? undefined : "bot");
    if (paid >= 20) award(game, player, "First to pay $20 or more in salaries");
  }
}

export function resolveMarketing(game: GameState) {
  for (const campaign of game.campaigns) {
    const house = game.houses.find((item) => item.id === campaign.houseId);
    if (house && house.demand.length < (house.garden ? 5 : 3)) {
      house.demand.push(campaign.good);
      addLog(game, `${campaign.good} demand appears at house ${house.id}.`);
    }
    if (!campaign.eternal) campaign.remaining -= 1;
  }
  game.campaigns = game.campaigns.filter((campaign) => campaign.eternal || campaign.remaining > 0);
}

function chooseBotActive(player: Player) {
  const ranked = player.roster.map((id, index) => ({ index, score: EMPLOYEES[id].level + (EMPLOYEES[id].produces ? 3 : 0) + (EMPLOYEES[id].marketing ? 2 : 0) }));
  ranked.sort((a, b) => b.score - a.score);
  player.active = ranked.slice(0, Math.min(ranked.length, 3 + ranked.filter((item) => EMPLOYEES[player.roster[item.index]].slots).reduce((sum, item) => sum + (EMPLOYEES[player.roster[item.index]].slots ?? 0), 0))).map((item) => item.index);
}

function botWork(game: GameState, player: Player) {
  const active = activeEmployees(player);
  const hires = 1 + active.reduce((sum, item) => sum + (item.employee.hires ?? 0), 0);
  const plans: Record<number, string[]> = {
    1: ["recruitingGirl", "kitchenTrainee", "marketingTrainee", "trainer"],
    2: ["kitchenTrainee", "marketingTrainee", "errandBoy", "pricingManager"],
    3: ["trainer", "kitchenTrainee", "waitress", "managementTrainee"],
  };
  for (let i = 0; i < hires; i += 1) {
    const plan = plans[player.id];
    const employeeId = plan[(player.roster.length + i + game.round) % plan.length];
    hire(game, employeeId, player.id);
  }
  for (const { index, employee } of activeEmployees(player)) {
    if (employee.produces) {
      const options = Object.keys(employee.produces) as Good[];
      const demandCounts = options.map((good) => game.houses.reduce((sum, house) => sum + house.demand.filter((item) => item === good).length, 0) - player.stock[good]);
      produce(game, index, options[demandCounts.indexOf(Math.max(...demandCounts))] ?? options[0], player.id);
    }
    if (employee.marketing) {
      const good: Good = player.id === 1 ? "burger" : player.id === 2 ? "pizza" : "soda";
      const target = game.houses[(game.round * 3 + player.id) % game.houses.length];
      market(game, index, target.id, good, player.id);
    }
  }
  const trainer = active.find((item) => item.employee.training);
  if (trainer) {
    const beachIndex = player.roster.findIndex((id, index) => !player.active.includes(index) && EMPLOYEES[id].next?.length);
    if (beachIndex >= 0) train(game, beachIndex, EMPLOYEES[player.roster[beachIndex]].next![0], player.id);
  }
}

export function advance(game: GameState) {
  if (game.phase === "restructure") {
    for (const bot of game.players.slice(1)) chooseBotActive(bot);
    game.turnOrder = [...game.players].sort((a, b) => openSlots(b) - openSlots(a) || game.turnOrder.indexOf(a.id) - game.turnOrder.indexOf(b.id)).map((player) => player.id);
    recalcWork(game);
    game.phase = "order";
    addLog(game, `Order of business: ${game.turnOrder.map((id) => game.players[id].chain).join(" → ")}.`);
    return;
  }
  if (game.phase === "order") {
    game.phase = "work";
    addLog(game, "Working 9–5 begins. Hire, train, market, and produce in that order.");
    return;
  }
  if (game.phase === "work") {
    for (const id of game.turnOrder) if (id !== 0) botWork(game, game.players[id]);
    game.phase = "dinner";
    addLog(game, "All chains have finished working. Houses now choose where to eat.");
    return;
  }
  if (game.phase === "dinner") {
    resolveDinner(game);
    if (game.bankBreaks < 2) game.phase = "payday";
    return;
  }
  if (game.phase === "payday") {
    resolvePayday(game);
    game.phase = "marketing";
    return;
  }
  if (game.phase === "marketing") {
    resolveMarketing(game);
    game.phase = "cleanup";
    return;
  }
  if (game.phase === "cleanup") {
    for (const player of game.players) {
      if (!player.milestones.includes("First to throw away drink/food")) {
        const total = player.stock.burger + player.stock.pizza + player.stock.soda;
        if (total > 0) {
          award(game, player, "First to throw away drink/food");
          player.stock = { burger: 0, pizza: 0, soda: 0 };
        }
      } else {
        let excess = player.stock.burger + player.stock.pizza + player.stock.soda - 10;
        for (const good of ["soda", "pizza", "burger"] as Good[]) {
          const discarded = Math.min(Math.max(0, excess), player.stock[good]);
          player.stock[good] -= discarded;
          excess -= discarded;
        }
      }
      player.active = [];
    }
    game.round += 1;
    game.phase = "restructure";
    game.work = { hires: 1, training: 0, produced: [], marketed: [] };
    addLog(game, `Round ${game.round} begins. Build a fresh company structure.`);
  }
}

export const PHASE_COPY: Record<Phase, { label: string; title: string; body: string; action: string }> = {
  restructure: { label: "1 / 7", title: "Restructuring", body: "Choose who works this round. Your CEO has 3 slots; managers add more. Employees on the beach can be trained later.", action: "Lock company" },
  order: { label: "2 / 7", title: "Order of business", body: "Chains with more open organization slots choose earlier. Earlier order wins final customer ties.", action: "Begin 9–5" },
  work: { label: "3 / 7", title: "Working 9–5", body: "Use your active employees. Recruit first, then train, advertise, and produce. Unused actions may be skipped.", action: "Finish work" },
  dinner: { label: "4 / 7", title: "Dinnertime", body: "Each house needs its entire order. The lowest price plus road distance wins; waitresses and turn order break ties.", action: "Resolve dinner" },
  payday: { label: "5 / 7", title: "Payday", body: "Every salary-bearing employee costs $5, including employees on the beach. Your training milestone can reduce this.", action: "Pay salaries" },
  marketing: { label: "6 / 7", title: "Marketing", body: "Campaigns add demand in campaign-number order. Normal homes hold 3 demand tokens; gardens hold 5.", action: "Run campaigns" },
  cleanup: { label: "7 / 7", title: "Cleanup", body: "Unsaved inventory spoils, structures return to hand, campaigns remain, and the next round begins.", action: "Start next round" },
  gameover: { label: "Final", title: "Game over", body: "The bank has broken for the second time. The richest restaurant chain wins.", action: "New game" },
};
