export type Good = "burger" | "pizza" | "soda" | "lemonade" | "beer";
export type Drink = "soda" | "lemonade" | "beer";
export type CampaignType = "billboard" | "mailbox" | "airplane" | "radio";
export type Phase = "setup" | "restructure" | "order" | "work" | "dinner" | "payday" | "marketing" | "cleanup" | "gameover";
export type CellKind = "lot" | "road" | "house" | "source";

export type Employee = {
  id: string;
  name: string;
  track: "service" | "management" | "recruiting" | "training" | "kitchen" | "marketing" | "pricing" | "buyer" | "expansion" | "finance";
  level: number;
  salary: boolean;
  entry?: boolean;
  unique?: boolean;
  slots?: number;
  hires?: number;
  training?: number;
  produces?: Partial<Record<Good, number>>;
  buyer?: { amount: number; range: number; fly?: boolean; anyDrink?: boolean };
  campaigns?: CampaignType[];
  range?: number;
  maxDuration?: number;
  price?: number;
  waitress?: number;
  action?: "house" | "restaurant" | "cfo";
  immediate?: boolean;
  next?: string[];
  supply: number;
  description: string;
};

export const EMPLOYEES: Record<string, Employee> = {
  waitress: { id: "waitress", name: "Waitress", track: "service", level: 1, salary: false, entry: true, waitress: 1, next: ["newBusinessDeveloper"], supply: 12, description: "Earn $3 and break customer ties." },
  newBusinessDeveloper: { id: "newBusinessDeveloper", name: "New Business Developer", track: "expansion", level: 2, salary: true, action: "house", next: ["localManager"], supply: 6, description: "Place a house or add a garden." },
  localManager: { id: "localManager", name: "Local Manager", track: "expansion", level: 3, salary: true, action: "restaurant", range: 3, next: ["regionalManager"], supply: 6, description: "Place a coming-soon restaurant within range 3; grants drive-in entrances." },
  regionalManager: { id: "regionalManager", name: "Regional Manager", track: "expansion", level: 4, salary: true, unique: true, action: "restaurant", range: 99, immediate: true, next: ["cfo"], supply: 2, description: "Place or move a restaurant anywhere; it opens immediately." },
  cfo: { id: "cfo", name: "CFO", track: "finance", level: 5, salary: true, unique: true, action: "cfo", supply: 2, description: "Add 50% to cash earned this round." },

  managementTrainee: { id: "managementTrainee", name: "Management Trainee", track: "management", level: 1, salary: false, entry: true, slots: 2, next: ["juniorVP"], supply: 18, description: "Manager with 2 reporting slots." },
  juniorVP: { id: "juniorVP", name: "Junior Vice President", track: "management", level: 2, salary: true, slots: 3, next: ["vicePresident", "recruitingManager", "coach"], supply: 12, description: "Manager with 3 reporting slots." },
  vicePresident: { id: "vicePresident", name: "Vice President", track: "management", level: 3, salary: true, slots: 4, next: ["seniorVP", "guru"], supply: 6, description: "Manager with 4 reporting slots." },
  seniorVP: { id: "seniorVP", name: "Senior Vice President", track: "management", level: 4, salary: true, slots: 5, next: ["executiveVP"], supply: 6, description: "Manager with 5 reporting slots." },
  executiveVP: { id: "executiveVP", name: "Executive Vice President", track: "management", level: 5, salary: true, unique: true, slots: 10, next: ["hrDirector"], supply: 2, description: "Manager with 10 reporting slots." },

  pricingManager: { id: "pricingManager", name: "Pricing Manager", track: "pricing", level: 1, salary: false, entry: true, price: -1, next: ["luxuriesManager"], supply: 12, description: "Mandatory: unit price -$1." },
  luxuriesManager: { id: "luxuriesManager", name: "Luxuries Manager", track: "pricing", level: 2, salary: true, unique: true, price: 10, next: ["discountManager"], supply: 2, description: "Mandatory: unit price +$10." },
  discountManager: { id: "discountManager", name: "Discount Manager", track: "pricing", level: 3, salary: true, price: -3, supply: 6, description: "Mandatory: unit price -$3." },

  recruitingGirl: { id: "recruitingGirl", name: "Recruiting Girl", track: "recruiting", level: 1, salary: false, entry: true, hires: 1, supply: 12, description: "Hire 1 additional employee." },
  recruitingManager: { id: "recruitingManager", name: "Recruiting Manager", track: "recruiting", level: 2, salary: true, hires: 2, supply: 6, description: "Two uses: hire or reduce salary by $5." },
  hrDirector: { id: "hrDirector", name: "HR Director", track: "recruiting", level: 5, salary: true, unique: true, hires: 4, supply: 2, description: "Four uses: hire or reduce salary by $5." },

  trainer: { id: "trainer", name: "Trainer", track: "training", level: 1, salary: false, entry: true, training: 1, supply: 12, description: "Train one beach employee one step." },
  coach: { id: "coach", name: "Coach", track: "training", level: 2, salary: true, training: 2, supply: 6, description: "Two training steps; both may go to one employee." },
  guru: { id: "guru", name: "Guru", track: "training", level: 4, salary: true, unique: true, training: 3, supply: 2, description: "Three training steps; all may go to one employee." },

  errandBoy: { id: "errandBoy", name: "Errand Boy", track: "buyer", level: 1, salary: false, entry: true, buyer: { amount: 1, range: 0, anyDrink: true }, next: ["cartOperator"], supply: 12, description: "Get 1 drink of any type without visiting a source." },
  cartOperator: { id: "cartOperator", name: "Cart Operator", track: "buyer", level: 2, salary: true, buyer: { amount: 2, range: 2 }, next: ["truckDriver"], supply: 6, description: "Get 2 drinks from each source on a road route of range 2." },
  truckDriver: { id: "truckDriver", name: "Truck Driver", track: "buyer", level: 3, salary: true, buyer: { amount: 3, range: 3 }, next: ["zeppelinPilot"], supply: 6, description: "Get 3 drinks from each source on a road route of range 3." },
  zeppelinPilot: { id: "zeppelinPilot", name: "Zeppelin Pilot", track: "buyer", level: 4, salary: true, unique: true, buyer: { amount: 2, range: 4, fly: true }, supply: 2, description: "Get 2 drinks from each source on a flight of range 4; ignore roads." },

  marketingTrainee: { id: "marketingTrainee", name: "Marketing Trainee", track: "marketing", level: 1, salary: false, entry: true, campaigns: ["billboard"], range: 2, maxDuration: 2, next: ["campaignManager"], supply: 12, description: "Place a billboard, range 2, maximum duration 2." },
  campaignManager: { id: "campaignManager", name: "Campaign Manager", track: "marketing", level: 2, salary: true, campaigns: ["billboard", "mailbox"], range: 3, maxDuration: 3, next: ["brandManager"], supply: 6, description: "Place a mailbox or billboard, range 3, maximum duration 3." },
  brandManager: { id: "brandManager", name: "Brand Manager", track: "marketing", level: 3, salary: true, campaigns: ["billboard", "mailbox", "airplane"], range: 99, maxDuration: 4, next: ["brandDirector"], supply: 6, description: "Place an airplane or lower campaign, maximum duration 4." },
  brandDirector: { id: "brandDirector", name: "Brand Director", track: "marketing", level: 4, salary: true, unique: true, campaigns: ["billboard", "mailbox", "airplane", "radio"], range: 99, maxDuration: 5, supply: 2, description: "Place a radio or lower campaign, maximum duration 5." },

  kitchenTrainee: { id: "kitchenTrainee", name: "Kitchen Trainee", track: "kitchen", level: 1, salary: false, entry: true, produces: { burger: 1, pizza: 1 }, next: ["burgerCook", "pizzaCook"], supply: 12, description: "Produce 1 burger or 1 pizza." },
  burgerCook: { id: "burgerCook", name: "Burger Cook", track: "kitchen", level: 2, salary: true, produces: { burger: 3 }, next: ["burgerChef"], supply: 6, description: "Produce 3 burgers." },
  burgerChef: { id: "burgerChef", name: "Burger Chef", track: "kitchen", level: 3, salary: true, unique: true, produces: { burger: 8 }, supply: 2, description: "Produce 8 burgers." },
  pizzaCook: { id: "pizzaCook", name: "Pizza Cook", track: "kitchen", level: 2, salary: true, produces: { pizza: 3 }, next: ["pizzaChef"], supply: 6, description: "Produce 3 pizzas." },
  pizzaChef: { id: "pizzaChef", name: "Pizza Chef", track: "kitchen", level: 3, salary: true, unique: true, produces: { pizza: 8 }, supply: 2, description: "Produce 8 pizzas." },
};

export const ENTRY_EMPLOYEES = Object.values(EMPLOYEES).filter((employee) => employee.entry);
export const DRINKS: Drink[] = ["soda", "lemonade", "beer"];
const GOODS: Good[] = ["burger", "pizza", "soda", "lemonade", "beer"];

type TileTemplate = { id: string; roads: string[]; house?: { number: number; row: number; col: number }; sources?: { good: Drink; row: number; col: number }[] };

// Functional redraw of the twenty base-game tiles (A-T). Each string is one 5x5 tile.
const TILE_TEMPLATES: TileTemplate[] = [
  { id: "A", roads: ["..=..", "..=..", "=====", "..=..", "..=.."], house: { number: 2, row: 3, col: 0 } },
  { id: "B", roads: ["..=..", "..=..", "=====", "..=..", "..=.."], house: { number: 4, row: 0, col: 3 } },
  { id: "C", roads: ["=====", "=...=", "=...=", "=...=", "====="], house: { number: 5, row: 1, col: 2 } },
  { id: "D", roads: ["=====", "=...=", "=...=", ".....", "....."], house: { number: 7, row: 1, col: 1 } },
  { id: "E", roads: ["===..", "=....", "=...=", "....=", "..==="], house: { number: 8, row: 2, col: 2 }, sources: [{ good: "beer", row: 1, col: 1 }] },
  { id: "F", roads: ["..=..", "..=..", "=====", ".....", "....."], house: { number: 10, row: 0, col: 0 } },
  { id: "G", roads: ["..=..", "..=..", "=====", "..=..", "..=.."], house: { number: 12, row: 0, col: 0 } },
  { id: "H", roads: ["..=..", "..=..", "=====", ".....", "....."], house: { number: 13, row: 3, col: 1 } },
  { id: "I", roads: ["..=..", "..=..", "=====", ".....", "....."], house: { number: 15, row: 3, col: 3 } },
  { id: "J", roads: ["..===", "....=", "=...=", "=....", "===.."], house: { number: 16, row: 1, col: 1 } },
  { id: "K", roads: ["=====", "=...=", "=...=", ".....", "....."], house: { number: 18, row: 1, col: 2 } },
  { id: "L", roads: ["..=..", "..=..", "=====", ".....", "....."], sources: [{ good: "lemonade", row: 3, col: 3 }] },
  { id: "M", roads: ["..===", "....=", "=...=", "=....", "===.."], sources: [{ good: "lemonade", row: 1, col: 3 }, { good: "soda", row: 3, col: 1 }] },
  { id: "N", roads: ["..=..", "..=..", "=====", ".....", "....."], sources: [{ good: "beer", row: 1, col: 1 }] },
  { id: "O", roads: ["..=..", "..=..", "=====", "..=..", "..=.."], sources: [{ good: "beer", row: 0, col: 1 }] },
  { id: "P", roads: ["..=..", "..=..", "=====", "..=..", "..=.."], sources: [{ good: "lemonade", row: 1, col: 0 }, { good: "beer", row: 4, col: 3 }] },
  { id: "Q", roads: ["..=..", "..=..", "=====", ".....", "....."], sources: [{ good: "soda", row: 3, col: 1 }] },
  { id: "R", roads: ["..=..", "..=..", "=====", "..=..", "..=.."], sources: [{ good: "soda", row: 1, col: 1 }] },
  { id: "S", roads: ["..=..", "..=..", "=====", "..=..", "..=.."], sources: [{ good: "soda", row: 0, col: 3 }, { good: "beer", row: 3, col: 0 }] },
  { id: "T", roads: ["..=..", "..=..", "=====", "..=..", "..=.."], sources: [{ good: "lemonade", row: 1, col: 1 }] },
];

export type BoardCell = { row: number; col: number; kind: CellKind; tileId: string; tileRow: number; tileCol: number };
export type House = { id: number; row: number; col: number; demand: Good[]; garden?: boolean; added?: boolean };
export type DrinkSource = { id: string; row: number; col: number; good: Drink };
export type Restaurant = { id: number; row: number; col: number; entranceRow: number; entranceCol: number; open: boolean };
export type BoardState = { rows: number; cols: number; cells: BoardCell[][]; houses: House[]; sources: DrinkSource[]; tiles: { id: string; row: number; col: number; rotation: number }[] };

export type Player = {
  id: number; name: string; chain: string; color: string; cash: number; reserve: number; reserveSlots: number;
  roster: string[]; active: number[]; stock: Record<Good, number>; milestones: string[]; restaurants: Restaurant[]; earnedThisRound: number;
};
export type Campaign = { id: number; playerId: number; targetHouseId: number; good: Good; type: CampaignType; remaining: number; eternal?: boolean; marketeerIndex: number };
export type WorkState = { hires: number; training: number; produced: number[]; marketed: number[]; builders: number[]; restaurantManagers: number[]; hiresMade: number; botsActed: number[] };
export type OrderSelection = { chooserIds: number[]; positions: (number | null)[]; nextChooserIndex: number };
export type GameState = {
  round: number; phase: Phase; bank: number; bankBreaks: number; ceoSlots: number;
  players: Player[]; board: BoardState; houses: House[]; sources: DrinkSource[]; campaigns: Campaign[]; turnOrder: number[];
  selectedHouse: number | null; selectedLot: { row: number; col: number } | null; work: WorkState; supply: Record<string, number>;
  orderSelection: OrderSelection | null;
  claimed: string[]; claimedThisRound: Record<string, number[]>;
  log: { id: number; round: number; text: string; tone?: "good" | "warn" | "bot" }[]; tutorial: boolean; gameStarted: boolean;
};

function rotatePoint(row: number, col: number, times: number) {
  let r = row; let c = col;
  for (let i = 0; i < times; i += 1) [r, c] = [c, 4 - r];
  return { row: r, col: c };
}

function rotateHouse(row: number, col: number, times: number) {
  let r = row; let c = col;
  for (let i = 0; i < times; i += 1) [r, c] = [c, 3 - r];
  return { row: r, col: c };
}

function rotatedRoads(roads: string[], times: number) {
  let grid = roads.map((row) => [...row]);
  for (let t = 0; t < times; t += 1) grid = Array.from({ length: 5 }, (_, r) => Array.from({ length: 5 }, (_, c) => grid[4 - c][r]));
  return grid;
}

function buildBoard(randomize = false): BoardState {
  const ids = TILE_TEMPLATES.map((tile) => tile.id);
  if (randomize) for (let index = ids.length - 1; index > 0; index -= 1) { const swap = Math.floor(Math.random() * (index + 1)); [ids[index], ids[swap]] = [ids[swap], ids[index]]; }
  const selection = ids.slice(0, 16);
  const rotations = randomize ? selection.map(() => Math.floor(Math.random() * 4)) : [0, 1, 2, 3, 0, 2, 1, 3, 1, 0, 2, 0, 1, 3, 2, 0];
  const cells: BoardCell[][] = Array.from({ length: 20 }, (_, row) => Array.from({ length: 20 }, (_, col) => ({ row, col, kind: "lot" as CellKind, tileId: "", tileRow: Math.floor(row / 5), tileCol: Math.floor(col / 5) })));
  const houses: House[] = []; const sources: DrinkSource[] = []; const tiles: BoardState["tiles"] = [];
  selection.forEach((id, index) => {
    const tile = TILE_TEMPLATES.find((item) => item.id === id)!; const tileRow = Math.floor(index / 4); const tileCol = index % 4; const rotation = rotations[index];
    tiles.push({ id, row: tileRow, col: tileCol, rotation });
    const roads = rotatedRoads(tile.roads, rotation);
    for (let row = 0; row < 5; row += 1) for (let col = 0; col < 5; col += 1) {
      const globalRow = tileRow * 5 + row; const globalCol = tileCol * 5 + col;
      cells[globalRow][globalCol] = { row: globalRow, col: globalCol, kind: roads[row][col] === "=" ? "road" : "lot", tileId: id, tileRow, tileCol };
    }
    if (tile.house) {
      const point = rotateHouse(tile.house.row, tile.house.col, rotation); const row = tileRow * 5 + point.row; const col = tileCol * 5 + point.col;
      houses.push({ id: tile.house.number, row, col, demand: [] });
      for (let r = row; r < row + 2; r += 1) for (let c = col; c < col + 2; c += 1) cells[r][c].kind = "house";
    }
    tile.sources?.forEach((source, sourceIndex) => {
      const point = rotatePoint(source.row, source.col, rotation); const row = tileRow * 5 + point.row; const col = tileCol * 5 + point.col;
      sources.push({ id: `${id}-${sourceIndex}`, row, col, good: source.good }); cells[row][col].kind = "source";
    });
  });
  return { rows: 20, cols: 20, cells, houses, sources, tiles };
}

const playerSeeds = [["You", "Golden Spoon", "#c83d2d"], ["Mara", "Burger Baron", "#167d66"], ["Otto", "Pizza Palace", "#2766a6"], ["June", "Soda Shop", "#d58b17"]] as const;
const emptyStock = (): Record<Good, number> => ({ burger: 0, pizza: 0, soda: 0, lemonade: 0, beer: 0 });
const emptyWork = (): WorkState => ({ hires: 1, training: 0, produced: [], marketed: [], builders: [], restaurantManagers: [], hiresMade: 0, botsActed: [] });

export function initialGame(reserve = 200, reserveSlots = 3, randomizeMap = false): GameState {
  const board = buildBoard(randomizeMap);
  const game: GameState = {
    round: 1, phase: "setup", bank: 200, bankBreaks: 0, ceoSlots: 3,
    players: playerSeeds.map(([name, chain, color], id) => ({ id, name, chain, color, cash: 0, reserve: id === 0 ? reserve : [100, 300, 200][id - 1], reserveSlots: id === 0 ? reserveSlots : [2, 4, 3][id - 1], roster: [], active: [], stock: emptyStock(), milestones: [], restaurants: [], earnedThisRound: 0 })),
    board, houses: board.houses, sources: board.sources, campaigns: [], turnOrder: [0, 1, 2, 3], selectedHouse: null, selectedLot: null, orderSelection: null,
    work: emptyWork(), supply: Object.fromEntries(Object.values(EMPLOYEES).map((employee) => [employee.id, employee.supply])),
    claimed: [], claimedThisRound: {}, tutorial: true, gameStarted: false,
    log: [{ id: 1, round: 1, text: "The 4×4 city was built from sixteen randomly oriented 5×5 base-game tiles. Bots placed in reverse turn order; choose your restaurant.", tone: "good" }],
  };
  autoPlaceBotRestaurants(game);
  return game;
}

export function cloneGame(game: GameState): GameState { return structuredClone(game); }
export function activeEmployees(player: Player) { return player.active.map((index) => ({ index, employee: EMPLOYEES[player.roster[index]] })).filter((item) => item.employee); }
export function capacity(player: Player, ceoSlots = 3) { return ceoSlots + activeEmployees(player).reduce((sum, item) => sum + (item.employee.slots ?? 0), 0); }
export function usedSlots(player: Player) { return player.active.length; }
export function openSlots(player: Player, ceoSlots = 3) { return Math.max(0, capacity(player, ceoSlots) - usedSlots(player)); }
export function price(player: Player) { return Math.max(0, 10 + activeEmployees(player).reduce((sum, item) => sum + (item.employee.price ?? 0), 0) - (player.milestones.includes("First to lower prices") ? 1 : 0)); }

function addLog(game: GameState, text: string, tone?: "good" | "warn" | "bot") { game.log.unshift({ id: (game.log[0]?.id ?? 0) + 1, round: game.round, text, tone }); game.log = game.log.slice(0, 60); }
function takeFromSupply(game: GameState, id: string) { if ((game.supply[id] ?? 0) <= 0) return false; game.supply[id] -= 1; return true; }
function returnToSupply(game: GameState, id: string) { game.supply[id] = (game.supply[id] ?? 0) + 1; }

function award(game: GameState, player: Player, milestone: string) {
  if (game.claimed.includes(milestone) || player.milestones.includes(milestone)) return;
  player.milestones.push(milestone); (game.claimedThisRound[milestone] ??= []).push(player.id);
  addLog(game, `${player.chain} claims “${milestone}”.`, player.id === 0 ? "good" : "bot");
  if (milestone === "First Burger produced" && takeFromSupply(game, "burgerCook")) player.roster.push("burgerCook");
  if (milestone === "First Pizza produced" && takeFromSupply(game, "pizzaCook")) player.roster.push("pizzaCook");
  if (milestone === "First to hire 3 people in 1 turn") for (let i = 0; i < 2; i += 1) if (takeFromSupply(game, "managementTrainee")) player.roster.push("managementTrainee");
}

function activateMilestones(game: GameState, player: Player) {
  const employees = activeEmployees(player).map((item) => item.employee);
  if (employees.some((item) => item.waitress)) award(game, player, "First Waitress played");
  if (employees.some((item) => item.id === "errandBoy")) award(game, player, "First Errand Boy played");
  if (employees.some((item) => item.id === "cartOperator")) award(game, player, "First Cart Operator played");
  if (employees.some((item) => (item.price ?? 0) < 0)) award(game, player, "First to lower prices");
}

export function recalcWork(game: GameState) {
  const player = game.players[0]; const active = activeEmployees(player);
  game.work.hires = 1 + active.reduce((sum, item) => sum + (item.employee.hires ?? 0), 0) - game.work.hiresMade;
  game.work.training = active.reduce((sum, item) => sum + (item.employee.training ?? 0), 0);
  game.work.produced = active.filter((item) => item.employee.produces || item.employee.buyer).map((item) => item.index);
  game.work.marketed = active.filter((item) => item.employee.campaigns).map((item) => item.index);
  game.work.builders = active.filter((item) => item.employee.action === "house").map((item) => item.index);
  game.work.restaurantManagers = active.filter((item) => item.employee.action === "restaurant").map((item) => item.index);
}

export function toggleActive(game: GameState, rosterIndex: number) {
  const player = game.players[0]; const position = player.active.indexOf(rosterIndex); const employee = EMPLOYEES[player.roster[rosterIndex]];
  if (game.campaigns.some((campaign) => campaign.playerId === player.id && campaign.marketeerIndex === rosterIndex)) return;
  if (position >= 0) { player.active.splice(position, 1); while (player.active.length > capacity(player, game.ceoSlots)) player.active.pop(); }
  else {
    const managerCount = activeEmployees(player).filter((item) => item.employee.slots).length;
    if (employee.slots && managerCount >= game.ceoSlots) return;
    if (employee.unique && player.active.some((index) => player.roster[index] === employee.id)) return;
    if (player.active.length < capacity(player, game.ceoSlots)) player.active.push(rosterIndex);
  }
  recalcWork(game);
}

export function hire(game: GameState, employeeId: string, playerId = 0) {
  const player = game.players[playerId]; const employee = EMPLOYEES[employeeId];
  if (!employee?.entry || !takeFromSupply(game, employeeId)) return;
  if (playerId === 0 && game.work.hires <= 0) { returnToSupply(game, employeeId); return; }
  if (employee.unique && player.roster.includes(employeeId)) { returnToSupply(game, employeeId); return; }
  player.roster.push(employeeId);
  if (playerId === 0) { game.work.hiresMade += 1; game.work.hires -= 1; if (game.work.hiresMade >= 3) award(game, player, "First to hire 3 people in 1 turn"); }
  addLog(game, `${player.chain} hires ${employee.name}; the new employee goes to the beach.`, playerId === 0 ? "good" : "bot");
}

export function train(game: GameState, rosterIndex: number, nextId: string, playerId = 0) {
  const player = game.players[playerId]; const beforeId = player.roster[rosterIndex]; const before = EMPLOYEES[beforeId];
  if (nextId === "cfo" && player.milestones.includes("First to have $100")) return;
  if (!before?.next?.includes(nextId) || !takeFromSupply(game, nextId) || player.active.includes(rosterIndex)) return;
  if (playerId === 0 && game.work.training <= 0) { returnToSupply(game, nextId); return; }
  returnToSupply(game, beforeId); player.roster[rosterIndex] = nextId; if (playerId === 0) game.work.training -= 1;
  addLog(game, `${player.chain} trains ${before.name} into ${EMPLOYEES[nextId].name}.`, playerId === 0 ? "good" : "bot"); award(game, player, "First to train someone");
}

export function produce(game: GameState, rosterIndex: number, good: Good, playerId = 0) {
  const player = game.players[playerId]; const employee = EMPLOYEES[player.roster[rosterIndex]];
  let amount = employee?.produces?.[good] ?? 0;
  if (employee?.buyer?.anyDrink && DRINKS.includes(good as Drink)) amount = employee.buyer.amount;
  if (!amount || (playerId === 0 && !game.work.produced.includes(rosterIndex))) return;
  if (employee.buyer && player.milestones.includes("First Errand Boy played")) amount += 1;
  player.stock[good] += amount; if (playerId === 0) game.work.produced = game.work.produced.filter((index) => index !== rosterIndex);
  addLog(game, `${player.chain} gets ${amount} ${good}${amount === 1 ? "" : "s"}.`, playerId === 0 ? "good" : "bot");
  if (good === "burger") award(game, player, "First Burger produced"); if (good === "pizza") award(game, player, "First Pizza produced");
}

function neighbors(row: number, col: number, board: BoardState) { return [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]].filter(([r, c]) => r >= 0 && c >= 0 && r < board.rows && c < board.cols) as [number, number][]; }
function tileOf(row: number, col: number) { return { row: Math.floor(row / 5), col: Math.floor(col / 5) }; }

function roadCosts(board: BoardState, starts: { row: number; col: number }[]) {
  const best = new Map<string, number>(); const queue = starts.map((start) => ({ ...start, cost: 0 })); starts.forEach((start) => best.set(`${start.row},${start.col}`, 0));
  while (queue.length) {
    queue.sort((a, b) => a.cost - b.cost); const current = queue.shift()!;
    for (const [row, col] of neighbors(current.row, current.col, board)) {
      if (board.cells[row][col].kind !== "road") continue;
      const fromTile = tileOf(current.row, current.col); const toTile = tileOf(row, col); const cost = current.cost + (fromTile.row !== toTile.row || fromTile.col !== toTile.col ? 1 : 0); const key = `${row},${col}`;
      if (cost < (best.get(key) ?? Infinity)) { best.set(key, cost); queue.push({ row, col, cost }); }
    }
  }
  return best;
}

function openEntrances(player: Player) { return player.restaurants.filter((item) => item.open).map((item) => ({ row: item.entranceRow, col: item.entranceCol })); }
export function roadDistance(game: GameState, player: Player, house: House) {
  const starts = openEntrances(player); if (!starts.length) return Infinity; const costs = roadCosts(game.board, starts);
  const adjacentRoads = new Set<string>();
  for (let r = house.row; r < house.row + 2; r += 1) for (let c = house.col; c < house.col + 2; c += 1) for (const [nr, nc] of neighbors(r, c, game.board)) if (game.board.cells[nr][nc].kind === "road") adjacentRoads.add(`${nr},${nc}`);
  return Math.min(...[...adjacentRoads].map((key) => costs.get(key) ?? Infinity));
}

export function reachableSources(game: GameState, player: Player, employee: Employee) {
  if (!employee.buyer || employee.buyer.anyDrink) return [];
  const bonus = player.milestones.includes("First Cart Operator played") ? 1 : 0; const maxRange = employee.buyer.range + bonus;
  if (employee.buyer.fly) {
    const restaurantTiles = player.restaurants.filter((item) => item.open).map((item) => tileOf(item.entranceRow, item.entranceCol));
    return game.sources.filter((source) => restaurantTiles.some((tile) => { const target = tileOf(source.row, source.col); return Math.abs(tile.row - target.row) + Math.abs(tile.col - target.col) <= maxRange; }));
  }
  const costs = roadCosts(game.board, openEntrances(player));
  return game.sources.filter((source) => neighbors(source.row, source.col, game.board).some(([row, col]) => game.board.cells[row][col].kind === "road" && (costs.get(`${row},${col}`) ?? Infinity) <= maxRange));
}

export function procureFromSource(game: GameState, rosterIndex: number, sourceId: string, playerId = 0) {
  const player = game.players[playerId]; const employee = EMPLOYEES[player.roster[rosterIndex]]; const source = game.sources.find((item) => item.id === sourceId);
  if (!source || !employee?.buyer || !reachableSources(game, player, employee).some((item) => item.id === sourceId) || (playerId === 0 && !game.work.produced.includes(rosterIndex))) return;
  const amount = employee.buyer.amount + (player.milestones.includes("First Errand Boy played") ? 1 : 0); player.stock[source.good] += amount;
  if (playerId === 0) game.work.produced = game.work.produced.filter((index) => index !== rosterIndex);
  addLog(game, `${player.chain} collects ${amount} ${source.good} from source ${source.id}.`, playerId === 0 ? "good" : "bot");
}

export function market(game: GameState, rosterIndex: number, houseId: number, good: Good, type: CampaignType = "billboard", playerId = 0) {
  const player = game.players[playerId]; const employee = EMPLOYEES[player.roster[rosterIndex]];
  if (!employee?.campaigns?.includes(type) || (playerId === 0 && !game.work.marketed.includes(rosterIndex))) return;
  const eternal = player.milestones.includes("First Billboard placed") || (type === "billboard" && !game.claimed.includes("First Billboard placed"));
  game.campaigns.push({ id: Math.max(0, ...game.campaigns.map((item) => item.id)) + 1, playerId, targetHouseId: houseId, good, type, remaining: employee.maxDuration ?? 1, eternal, marketeerIndex: rosterIndex });
  if (playerId === 0) game.work.marketed = game.work.marketed.filter((index) => index !== rosterIndex);
  if (type === "billboard") award(game, player, "First Billboard placed"); if (type === "airplane") award(game, player, "First Airplane campaign"); if (type === "radio") award(game, player, "First Radio campaign");
  award(game, player, good === "burger" ? "First Burger marketed" : good === "pizza" ? "First Pizza marketed" : "First Drink marketed");
  addLog(game, `${player.chain} starts a ${type} advertising ${good} near house ${houseId}.`, playerId === 0 ? "good" : "bot");
}

function restaurantEntranceCandidates(game: GameState, row: number, col: number) {
  return [{ row: row - 1, col }, { row, col: col + 2 }, { row: row + 2, col: col + 1 }, { row: row + 1, col: col - 1 }]
    .filter((point) => point.row >= 0 && point.col >= 0 && point.row < game.board.rows && point.col < game.board.cols && game.board.cells[point.row][point.col].kind === "road");
}

function validRestaurantEntrances(game: GameState, row: number, col: number, initial: boolean, ignoredRestaurant?: { playerId: number; restaurantId: number }) {
  return restaurantEntranceCandidates(game, row, col).filter((entrance) => {
    if (!initial) return true;
    const entranceTile = tileOf(entrance.row, entrance.col);
    return !game.players.some((player) => player.restaurants.some((restaurant) => {
      if (ignoredRestaurant?.playerId === player.id && ignoredRestaurant.restaurantId === restaurant.id) return false;
      const tile = tileOf(restaurant.entranceRow, restaurant.entranceCol);
      return tile.row === entranceTile.row && tile.col === entranceTile.col;
    }));
  });
}

export function isValidRestaurantSpot(game: GameState, row: number, col: number, initial = false, ignoredRestaurant?: { playerId: number; restaurantId: number }) {
  if (row < 0 || col < 0 || row + 1 >= game.board.rows || col + 1 >= game.board.cols) return false;
  for (let r = row; r < row + 2; r += 1) for (let c = col; c < col + 2; c += 1) if (game.board.cells[r][c].kind !== "lot" || game.players.some((player) => player.restaurants.some((restaurant) => !(ignoredRestaurant?.playerId === player.id && ignoredRestaurant.restaurantId === restaurant.id) && r >= restaurant.row && r < restaurant.row + 2 && c >= restaurant.col && c < restaurant.col + 2))) return false;
  return validRestaurantEntrances(game, row, col, initial, ignoredRestaurant).length > 0;
}

export function validRestaurantPlacements(game: GameState, initial = false, ignoredRestaurant?: { playerId: number; restaurantId: number }) { const result: { row: number; col: number }[] = []; for (let row = 0; row < game.board.rows - 1; row += 1) for (let col = 0; col < game.board.cols - 1; col += 1) if (isValidRestaurantSpot(game, row, col, initial, ignoredRestaurant)) result.push({ row, col }); return result; }

function placeRestaurantAt(game: GameState, player: Player, row: number, col: number, open: boolean, initial: boolean) {
  if (!isValidRestaurantSpot(game, row, col, initial) || player.restaurants.length >= 3) return false; const entrance = validRestaurantEntrances(game, row, col, initial)[0];
  player.restaurants.push({ id: player.restaurants.length + 1, row, col, entranceRow: entrance.row, entranceCol: entrance.col, open });
  addLog(game, `${player.chain} places a restaurant${open ? "" : " (coming soon)"}.`, player.id === 0 ? "good" : "bot"); return true;
}

function autoPlaceBotRestaurants(game: GameState) {
  for (const id of [3, 2, 1]) {
    const choices = validRestaurantPlacements(game, true); const preferred = id === 3 ? choices.at(-1) : id === 2 ? choices[Math.floor(choices.length / 2)] : choices[Math.floor(choices.length / 3)];
    if (preferred) placeRestaurantAt(game, game.players[id], preferred.row, preferred.col, true, true);
  }
}

export function placeStartingRestaurant(game: GameState, row: number, col: number) { if (game.phase !== "setup") return; if (placeRestaurantAt(game, game.players[0], row, col, true, true)) { game.phase = "restructure"; game.selectedLot = null; addLog(game, "All starting restaurants are placed. Build your first company structure.", "good"); } }

export function moveStartingRestaurant(game: GameState, row: number, col: number) {
  const player = game.players[0]; const restaurant = player.restaurants[0];
  if (game.phase !== "restructure" || game.round !== 1 || !restaurant || player.restaurants.length !== 1) return;
  if (restaurant.row === row && restaurant.col === col) return;
  const ignored = { playerId: player.id, restaurantId: restaurant.id };
  if (!isValidRestaurantSpot(game, row, col, true, ignored)) return;
  const entrance = validRestaurantEntrances(game, row, col, true, ignored)[0];
  restaurant.row = row; restaurant.col = col; restaurant.entranceRow = entrance.row; restaurant.entranceCol = entrance.col;
  game.selectedLot = null; addLog(game, "Golden Spoon moves its starting restaurant before locking the company.", "good");
}

export function rotateStartingRestaurant(game: GameState) {
  const player = game.players[0]; const restaurant = player.restaurants[0];
  if (game.phase !== "restructure" || game.round !== 1 || !restaurant || player.restaurants.length !== 1) return;
  const entrances = validRestaurantEntrances(game, restaurant.row, restaurant.col, true, { playerId: player.id, restaurantId: restaurant.id });
  if (entrances.length < 2) return;
  const current = entrances.findIndex((entrance) => entrance.row === restaurant.entranceRow && entrance.col === restaurant.entranceCol);
  const next = entrances[(current + 1) % entrances.length]; restaurant.entranceRow = next.row; restaurant.entranceCol = next.col;
  addLog(game, "Golden Spoon rotates its printed entrance toward another road.", "good");
}

export function canRotateStartingRestaurant(game: GameState) {
  const player = game.players[0]; const restaurant = player.restaurants[0];
  if (game.phase !== "restructure" || game.round !== 1 || !restaurant || player.restaurants.length !== 1) return false;
  return validRestaurantEntrances(game, restaurant.row, restaurant.col, true, { playerId: player.id, restaurantId: restaurant.id }).length > 1;
}

export function expandRestaurant(game: GameState, rosterIndex: number, row: number, col: number) {
  if (!game.work.restaurantManagers.includes(rosterIndex)) return; const employee = EMPLOYEES[game.players[0].roster[rosterIndex]];
  if (placeRestaurantAt(game, game.players[0], row, col, Boolean(employee.immediate), false)) game.work.restaurantManagers = game.work.restaurantManagers.filter((index) => index !== rosterIndex);
}

export function addGarden(game: GameState, rosterIndex: number, houseId: number) { if (!game.work.builders.includes(rosterIndex)) return; const house = game.houses.find((item) => item.id === houseId); if (!house || house.garden) return; house.garden = true; game.work.builders = game.work.builders.filter((index) => index !== rosterIndex); addLog(game, `Golden Spoon adds a garden to house ${house.id}.`, "good"); }

export function addHouse(game: GameState, rosterIndex: number, row: number, col: number) {
  if (!game.work.builders.includes(rosterIndex) || row < 0 || col < 0 || row + 1 >= 20 || col + 1 >= 20) return;
  for (let r = row; r < row + 2; r += 1) for (let c = col; c < col + 2; c += 1) if (game.board.cells[r][c].kind !== "lot") return;
  if (![...neighbors(row, col, game.board), ...neighbors(row + 1, col + 1, game.board)].some(([r, c]) => game.board.cells[r][c].kind === "road")) return;
  const nextNumber = [1, 3, 6, 9, 11, 14, 17, 20].find((id) => !game.houses.some((house) => house.id === id)); if (!nextNumber) return;
  const house: House = { id: nextNumber, row, col, demand: [], garden: true, added: true }; game.houses.push(house); game.board.houses.push(house); for (let r = row; r < row + 2; r += 1) for (let c = col; c < col + 2; c += 1) game.board.cells[r][c].kind = "house";
  game.work.builders = game.work.builders.filter((index) => index !== rosterIndex); addLog(game, `Golden Spoon places garden house ${nextNumber}.`, "good");
}

function payFromBank(game: GameState, player: Player, amount: number) { player.cash += amount; player.earnedThisRound += amount; game.bank -= amount; }
function handleBankBreak(game: GameState) {
  if (game.bank > 0) return; game.bankBreaks += 1;
  if (game.bankBreaks === 1) { const reserve = game.players.reduce((sum, player) => sum + player.reserve, 0); game.bank += reserve; const counts = new Map<number, number>(); game.players.forEach((player) => counts.set(player.reserveSlots, (counts.get(player.reserveSlots) ?? 0) + 1)); game.ceoSlots = [...counts.entries()].sort((a, b) => b[1] - a[1] || b[0] - a[0])[0][0]; addLog(game, `The bank breaks. Reserves reveal $${reserve}; all CEOs will have ${game.ceoSlots} slots next round.`, "warn"); }
  else { game.phase = "gameover"; addLog(game, "The bank breaks for the second time. Payday is skipped; richest chain wins.", "warn"); }
}

export function resolveDinner(game: GameState) {
  let served = 0; game.houses.sort((a, b) => a.id - b.id);
  for (const house of game.houses) {
    if (!house.demand.length) continue; const needed = house.demand.reduce<Record<Good, number>>((total, good) => ({ ...total, [good]: total[good] + 1 }), emptyStock());
    const eligible = game.players.filter((player) => roadDistance(game, player, house) < Infinity && GOODS.every((good) => player.stock[good] >= needed[good]));
    if (!eligible.length) { addLog(game, `House ${house.id} cannot find a connected chain with its complete order.`, "warn"); continue; }
    eligible.sort((a, b) => { const score = price(a) + roadDistance(game, a, house) - (price(b) + roadDistance(game, b, house)); if (score) return score; const waitresses = activeEmployees(b).filter((item) => item.employee.waitress).length - activeEmployees(a).filter((item) => item.employee.waitress).length; return waitresses || game.turnOrder.indexOf(a.id) - game.turnOrder.indexOf(b.id); });
    const winner = eligible[0]; house.demand.forEach((good) => { winner.stock[good] -= 1; });
    const bonuses = house.demand.reduce((sum, good) => sum + (winner.milestones.includes(good === "burger" ? "First Burger marketed" : good === "pizza" ? "First Pizza marketed" : "First Drink marketed") ? 5 : 0), 0);
    const income = house.demand.length * price(winner) * (house.garden ? 2 : 1) + bonuses; payFromBank(game, winner, income); addLog(game, `House ${house.id} buys ${house.demand.join(" + ")} from ${winner.chain} for $${income}.`, winner.id === 0 ? "good" : "bot"); house.demand = []; served += 1;
  }
  for (const player of game.players) { const waitresses = activeEmployees(player).filter((item) => item.employee.waitress).length; if (waitresses) payFromBank(game, player, waitresses * (player.milestones.includes("First Waitress played") ? 5 : 3)); if (player.earnedThisRound > 0 && (activeEmployees(player).some((item) => item.employee.action === "cfo") || player.milestones.includes("First to have $100"))) payFromBank(game, player, Math.ceil(player.earnedThisRound * 0.5)); if (player.cash >= 20) award(game, player, "First to have $20"); if (player.cash >= 100) award(game, player, "First to have $100"); }
  if (!served) addLog(game, "No houses ate this round.", "warn"); handleBankBreak(game);
}

export function fireEmployee(game: GameState, rosterIndex: number) {
  const player = game.players[0]; const id = player.roster[rosterIndex];
  if (!id || game.campaigns.some((campaign) => campaign.playerId === player.id && campaign.marketeerIndex === rosterIndex)) return;
  returnToSupply(game, id); player.roster.splice(rosterIndex, 1);
  player.active = player.active.filter((index) => index !== rosterIndex).map((index) => index > rosterIndex ? index - 1 : index);
  game.campaigns.forEach((campaign) => { if (campaign.playerId === player.id && campaign.marketeerIndex > rosterIndex) campaign.marketeerIndex -= 1; });
  addLog(game, `Golden Spoon fires ${EMPLOYEES[id].name}.`, "warn");
}

export function resolvePayday(game: GameState) {
  for (const player of game.players) {
    let salary = player.roster.filter((id) => EMPLOYEES[id]?.salary && !(player.milestones.includes("First Billboard placed") && EMPLOYEES[id].track === "marketing")).length * 5;
    const recruitingUses = activeEmployees(player).reduce((sum, item) => sum + (item.employee.track === "recruiting" ? item.employee.hires ?? 0 : 0), 0);
    const recruitingHiresUsed = Math.max(0, (player.id === 0 ? game.work.hiresMade : 1) - 1);
    salary = Math.max(0, salary - Math.max(0, recruitingUses - recruitingHiresUsed) * 5);
    if (player.milestones.includes("First to train someone")) salary = Math.max(0, salary - 15); const paid = Math.min(player.cash, salary); player.cash -= paid; if (paid) addLog(game, `${player.chain} pays $${paid} in salaries.`, player.id === 0 ? undefined : "bot"); if (paid >= 20) award(game, player, "First to pay $20 or more in salaries");
  }
}

function campaignHouses(game: GameState, campaign: Campaign) {
  const target = game.houses.find((house) => house.id === campaign.targetHouseId); if (!target) return [];
  const tile = tileOf(target.row, target.col);
  if (campaign.type === "billboard") return [target];
  if (campaign.type === "mailbox") return game.houses.filter((house) => { const other = tileOf(house.row, house.col); return other.row === tile.row && other.col === tile.col; });
  if (campaign.type === "airplane") return game.houses.filter((house) => tileOf(house.row, house.col).row === tile.row);
  return game.houses.filter((house) => { const other = tileOf(house.row, house.col); return Math.abs(other.row - tile.row) <= 1 && Math.abs(other.col - tile.col) <= 1; });
}

export function resolveMarketing(game: GameState) {
  [...game.campaigns].sort((a, b) => a.id - b.id).forEach((campaign) => {
    const owner = game.players[campaign.playerId]; const amount = campaign.type === "radio" && owner.milestones.includes("First Radio campaign") ? 2 : 1;
    campaignHouses(game, campaign).forEach((house) => { for (let i = 0; i < amount && house.demand.length < (house.garden ? 5 : 3); i += 1) house.demand.push(campaign.good); });
    if (!campaign.eternal) campaign.remaining -= 1;
  });
  game.campaigns = game.campaigns.filter((campaign) => campaign.eternal || campaign.remaining > 0); addLog(game, "Campaigns add demand in printed campaign order.");
}

function chooseBotActive(game: GameState, player: Player) {
  const busyIndices = new Set(game.campaigns.filter((campaign) => campaign.playerId === player.id).map((campaign) => campaign.marketeerIndex));
  const ranked = player.roster.map((id, index) => ({ index, score: EMPLOYEES[id].level + (EMPLOYEES[id].produces || EMPLOYEES[id].buyer ? 3 : 0) + (EMPLOYEES[id].campaigns ? 2 : 0) })).sort((a, b) => b.score - a.score);
  player.active = []; for (const candidate of ranked) { if (busyIndices.has(candidate.index)) continue; const employee = EMPLOYEES[player.roster[candidate.index]]; const managers = activeEmployees(player).filter((item) => item.employee.slots).length; if (employee.slots && managers >= game.ceoSlots) continue; if (player.active.length < capacity(player, game.ceoSlots)) player.active.push(candidate.index); }
  activateMilestones(game, player);
}

function botWork(game: GameState, player: Player) {
  if (game.work.botsActed.includes(player.id)) return; game.work.botsActed.push(player.id);
  const active = activeEmployees(player); const hires = 1 + active.reduce((sum, item) => sum + (item.employee.hires ?? 0), 0); const plans: Record<number, string[]> = { 1: ["recruitingGirl", "kitchenTrainee", "marketingTrainee", "trainer"], 2: ["kitchenTrainee", "marketingTrainee", "errandBoy", "pricingManager"], 3: ["trainer", "kitchenTrainee", "waitress", "managementTrainee"] };
  for (let i = 0; i < hires; i += 1) { const plan = plans[player.id]; hire(game, plan[(player.roster.length + game.round + i) % plan.length], player.id); }
  for (const { index, employee } of activeEmployees(player)) {
    if (employee.produces) { const options = Object.keys(employee.produces) as Good[]; produce(game, index, options[0], player.id); }
    else if (employee.buyer?.anyDrink) produce(game, index, player.id === 1 ? "beer" : player.id === 2 ? "lemonade" : "soda", player.id);
    else if (employee.buyer) { const source = reachableSources(game, player, employee)[0]; if (source) procureFromSource(game, index, source.id, player.id); }
    if (employee.campaigns) { const good: Good = player.id === 1 ? "burger" : player.id === 2 ? "pizza" : "soda"; const target = game.houses[(game.round * 3 + player.id) % game.houses.length]; market(game, index, target.id, good, employee.campaigns[0], player.id); }
  }
}

function continueBotOrderChoices(game: GameState) {
  const selection = game.orderSelection; if (!selection) return;
  while (selection.nextChooserIndex < selection.chooserIds.length && selection.chooserIds[selection.nextChooserIndex] !== 0) {
    const botId = selection.chooserIds[selection.nextChooserIndex]; const position = selection.positions.findIndex((id) => id === null);
    selection.positions[position] = botId; selection.nextChooserIndex += 1;
    addLog(game, `${game.players[botId].chain} chooses position ${position + 1}.`, "bot");
  }
  if (selection.nextChooserIndex === selection.chooserIds.length) {
    game.turnOrder = selection.positions as number[];
    addLog(game, `Turn order set: ${game.turnOrder.map((id) => game.players[id].chain).join(" → ")}.`);
  }
}

function beginOrderSelection(game: GameState) {
  const previousOrder = [...game.turnOrder];
  const chooserIds = [...game.players].sort((a, b) => (openSlots(b, game.ceoSlots) + (b.milestones.includes("First Airplane campaign") ? 2 : 0)) - (openSlots(a, game.ceoSlots) + (a.milestones.includes("First Airplane campaign") ? 2 : 0)) || previousOrder.indexOf(a.id) - previousOrder.indexOf(b.id)).map((player) => player.id);
  game.orderSelection = { chooserIds, positions: Array(game.players.length).fill(null), nextChooserIndex: 0 };
  game.phase = "order"; continueBotOrderChoices(game);
  if (game.orderSelection.nextChooserIndex < chooserIds.length) addLog(game, "Golden Spoon may choose any unclaimed turn position.", "good");
}

export function chooseTurnPosition(game: GameState, position: number) {
  const selection = game.orderSelection;
  if (game.phase !== "order" || !selection || selection.chooserIds[selection.nextChooserIndex] !== 0 || position < 0 || position >= selection.positions.length || selection.positions[position] !== null) return;
  selection.positions[position] = 0; selection.nextChooserIndex += 1; addLog(game, `Golden Spoon chooses position ${position + 1}.`, "good");
  continueBotOrderChoices(game);
}

export function advance(game: GameState) {
  if (game.phase === "setup") return;
  if (game.phase === "restructure") { game.players.slice(1).forEach((bot) => chooseBotActive(game, bot)); activateMilestones(game, game.players[0]); recalcWork(game); beginOrderSelection(game); return; }
  if (game.phase === "order") { if (!game.orderSelection || game.orderSelection.positions.some((id) => id === null)) return; game.phase = "work"; const userPosition = game.turnOrder.indexOf(0); game.turnOrder.slice(0, userPosition).forEach((id) => botWork(game, game.players[id])); addLog(game, "Working 9–5 begins. Your CEO always has one hire action.", "good"); return; }
  if (game.phase === "work") { const userPosition = game.turnOrder.indexOf(0); game.turnOrder.slice(userPosition + 1).forEach((id) => botWork(game, game.players[id])); game.phase = "dinner"; addLog(game, "All chains finish working. Houses now choose where to eat."); return; }
  if (game.phase === "dinner") { resolveDinner(game); if (game.bankBreaks < 2) game.phase = "payday"; return; }
  if (game.phase === "payday") { resolvePayday(game); game.phase = "marketing"; return; }
  if (game.phase === "marketing") { resolveMarketing(game); game.phase = "cleanup"; return; }
  if (game.phase === "cleanup") {
    for (const player of game.players) {
      const total = GOODS.reduce((sum, good) => sum + player.stock[good], 0);
      if (!player.milestones.includes("First to throw away drink/food") && total > 0) { award(game, player, "First to throw away drink/food"); player.stock = emptyStock(); }
      else if (player.milestones.includes("First to throw away drink/food") && total > 10) { let excess = total - 10; for (const good of GOODS) { const discard = Math.min(excess, player.stock[good]); player.stock[good] -= discard; excess -= discard; } }
      player.active = []; player.earnedThisRound = 0; player.restaurants.forEach((restaurant) => { restaurant.open = true; });
    }
    game.claimed.push(...Object.keys(game.claimedThisRound)); game.claimedThisRound = {}; game.round += 1; game.phase = "restructure"; game.work = emptyWork(); game.orderSelection = null; game.selectedHouse = null; game.selectedLot = null; addLog(game, `Round ${game.round} begins. Build a fresh company structure.`); return;
  }
}

export const PHASE_COPY: Record<Phase, { label: string; title: string; body: string; action: string }> = {
  setup: { label: "Setup", title: "Place your restaurant", body: "Starting restaurants are placed in reverse turn order. Choose a highlighted empty 2×2 area whose entrance touches a road.", action: "Select a highlighted lot" },
  restructure: { label: "1 / 7", title: "Restructuring", body: "Build a legal pyramid. The CEO has 3 slots; manager cards may report to the CEO and add slots for non-managers.", action: "Lock company" },
  order: { label: "2 / 7", title: "Order of business", body: "More open slots chooses turn order first. Previous order breaks ties; the airplane milestone counts as two extra open slots.", action: "Begin 9–5" },
  work: { label: "3 / 7", title: "Working 9–5", body: "Act in order: recruit, train, advertise, produce/procure, place restaurants, then place houses or gardens.", action: "Finish work" },
  dinner: { label: "4 / 7", title: "Dinnertime", body: "Houses resolve by printed number. A chain needs the complete order and a road connection; lowest price plus tile-border distance wins.", action: "Resolve dinner" },
  payday: { label: "5 / 7", title: "Payday", body: "Fire employees if needed, then pay $5 for every salary icon in the structure, on the beach, or busy marketing.", action: "Pay salaries" },
  marketing: { label: "6 / 7", title: "Marketing", body: "Campaigns resolve by number. Houses hold 3 demand tokens, or 5 with a garden.", action: "Run campaigns" },
  cleanup: { label: "7 / 7", title: "Cleanup", body: "Inventory spoils unless frozen, coming-soon restaurants open, and milestones claimed this round close.", action: "Start next round" },
  gameover: { label: "Final", title: "Game over", body: "The bank broke for the second time during dinner. The richest chain wins; turn order breaks ties.", action: "New game" },
};
