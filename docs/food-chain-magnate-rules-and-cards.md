# Food Chain Magnate Rules and Card Reference

Working document for building a playable web implementation of **Food Chain Magnate** against bots.

This is a paraphrased implementation reference, not a replacement for the published rulebook. Use it to model game state and learn the system, and keep the official rulebook nearby for final rules disputes.

## Sources

- English rulebook, Splotter third-edition rules PDF mirrored at QUGS: https://www.qugs.org/rules/r175914.pdf
- BoardGameGeek English rulebook file page: https://boardgamegeek.com/filepage/123433/english-rulebook
- BoardGameGeek FAQ, including component-limit clarifications: https://boardgamegeek.com/wiki/page/Food_Chain_Magnate_FAQ
- Public card-count list on Scribd: https://www.scribd.com/document/335843397/Food-Chain-Magnate-Cards-List
- Splotter shop page for high-level game description and player count: https://www.splottershop.com/products/food-chain-magnate

## Scope

This document covers the base game. It does not yet include *The Ketchup Mechanism & Other Ideas*, deluxe edition modules, coffee/kimchi/sushi/noodles, road blocks, new milestones, or revised reserve systems.

## Game Objective

Players run competing fast-food chains. They hire and train employees, advertise demand into neighborhoods, produce food and drinks, compete for customers, and manage wages. The game ends when the bank breaks for the second time; the richest player wins. Ties are broken by earlier turn order.

## Core Components

| Component | Count / Notes |
| --- | --- |
| Players | 2-5 |
| Map tiles | 20, each 5x5 squares |
| House tiles | 8 |
| Garden tiles | 8 |
| Marketing tiles | 16 total: 6 billboards, 4 mailboxes, 3 airplanes, 3 radios |
| Busy chips | 16 numbered chips matching marketing tiles |
| Restaurants | 3 per player |
| Turn order track | 1 |
| Turn order markers | 1 per player chain |
| CEO cards | 6 |
| Bank reserve cards | 18 total: 6 each at +$100, +$200, +$300 |
| Employee cards | 222 |
| Milestone cards | 84 |
| Food/drink tokens | Burgers, pizzas, soft drinks, lemonade, beer. Tokens are effectively unlimited for rules purposes. |
| Money | Effectively unlimited except for the bank pool timing rules. |

FAQ clarification: employee cards are limited to the available supply. Food/drink tokens and milestone copies are unlimited if needed, but most physical components besides those are limited to the supplied components.

## Player Count Setup

| Players | Initial bank | Map size | Copies of each `1x` employee used | Billboards removed |
| --- | ---: | --- | ---: | --- |
| 2 | $100 | 3x3 tiles | 1 | #12, #15, #16 |
| 3 | $150 | 3x4 tiles | 1 | #15, #16 |
| 4 | $200 | 4x4 tiles | 2 | #16 |
| 5 | $250 | 5x4 tiles | 3 | None |

Each player receives:

- 1 CEO card.
- 3 restaurant markers.
- 3 reserve cards, one each of +$100, +$200, and +$300.

Initial turn order is random. Starting restaurants are placed in reverse turn order. Each player secretly chooses one reserve card; chosen reserve cards become the hidden reserve pool and the unused reserve cards are discarded unseen.

## Card Inventory

### Starting Cards

| Card | Quantity | Notes |
| --- | ---: | --- |
| CEO | 6 | Each player starts with one. Always works. Has 3 slots before reserve cards resolve. Can hire 1 employee each turn. |
| Reserve +$100 | 6 | Secretly chosen by each player from their reserve set. |
| Reserve +$200 | 6 | Secretly chosen by each player from their reserve set. |
| Reserve +$300 | 6 | Secretly chosen by each player from their reserve set. |

### Employee Cards

Legend:

- **Entry** means recruitable directly.
- **Salary** means the card normally costs $5 during Payday unless discounted or exempted.
- **Unique** means a player may own only one copy of that job title. In setup, these are also limited by player count.
- **Slots** only matter for manager cards that can hold subordinates in the company structure.

| Card | Qty | Type | Entry | Salary | Unique | Slots / Range | Effect |
| --- | ---: | --- | --- | --- | --- | --- | --- |
| Waitress | 12 | Service | Yes | No | No | - | Earns $3 after house sales; wins customer ties against chains with fewer waitresses. |
| New Business Developer | 6 | Expansion | No | Yes | No | - | Places one new house or garden. |
| Local Manager | 6 | Expansion | No | Yes | No | Range 3 | Places a new restaurant within road range 3; new restaurant opens next turn. Active chain has drive-in corners. |
| Regional Manager | 3 | Expansion | No | Yes | Yes | Global | Places or moves a restaurant anywhere valid; opens immediately. Active chain has drive-in corners. |
| CFO | 3 | Finance | No | Yes | Yes | - | Adds 50% to that chain's cash earned this turn, rounded up, after waitress income. |
| Management Trainee | 18 | Manager | Yes | No | No | 2 slots | Entry manager. |
| Junior Vice President | 12 | Manager | No | Yes | No | 3 slots | Manager. |
| Vice President | 6 | Manager | No | Yes | No | 4 slots | Manager. |
| Senior Vice President | 6 | Manager | No | Yes | No | 5 slots | Manager. |
| Executive Vice President | 3 | Manager | No | Yes | Yes | 10 slots | Manager. |
| Pricing Manager | 12 | Pricing | Yes | No | No | - | Lowers unit price by $1 while at work. Mandatory. |
| Luxuries Manager | 3 | Pricing | No | Yes | Yes | - | Raises unit price by $10 while at work. Mandatory. |
| Discount Manager | 6 | Pricing | No | Yes | No | - | Lowers unit price by $3 while at work. Mandatory. |
| Recruiting Girl | 12 | Recruiting | Yes | No | No | - | Hires 1 employee. |
| Recruiting Manager | 6 | Recruiting | No | Yes | No | - | Two uses: each use either hires 1 employee or reduces Payday salaries by $5. |
| HR Director | 3 | Recruiting | No | Yes | Yes | - | Four uses: each use either hires 1 employee or reduces Payday salaries by $5. |
| Trainer | 12 | Training | Yes | No | No | - | Trains 1 beach employee one step. |
| Coach | 6 | Training | No | Yes | No | - | 2 training steps; may apply both to the same employee. |
| Guru | 3 | Training | No | Yes | Yes | - | 3 training steps; may apply up to three to the same employee. |
| Errand Boy | 12 | Buyer | Yes | No | No | - | Gets 1 drink of any type. |
| Cart Operator | 6 | Buyer | No | Yes | No | Road range 2 | Gets 2 drinks from each drink source passed along a road route. |
| Truck Driver | 6 | Buyer | No | Yes | No | Road range 3 | Gets 3 drinks from each drink source passed along a road route. |
| Zeppelin Pilot | 3 | Buyer | No | Yes | Yes | Zeppelin range 4 | Gets 2 drinks from each drink source on flown-over tiles; ignores roads and cannot cover the same tile twice. |
| Marketing Trainee | 12 | Marketing | Yes | No | No | Road range 2 | Places billboard campaign, max duration 2. |
| Campaign Manager | 6 | Marketing | No | Yes | No | Road range 3 | Places mailbox or billboard campaign, max duration 3. |
| Brand Manager | 6 | Marketing | No | Yes | No | No range limit | Places airplane, mailbox, or billboard campaign, max duration 4. |
| Brand Director | 3 | Marketing | No | Yes | Yes | No range limit | Places radio, airplane, mailbox, or billboard campaign, max duration 5. |
| Kitchen Trainee | 12 | Kitchen | Yes | No | No | - | Produces 1 burger or 1 pizza. |
| Burger Cook | 6 | Kitchen | No | Yes | No | - | Produces 3 burgers. |
| Burger Chef | 3 | Kitchen | No | Yes | Yes | - | Produces 8 burgers. |
| Pizza Cook | 6 | Kitchen | No | Yes | No | - | Produces 3 pizzas. |
| Pizza Chef | 3 | Kitchen | No | Yes | Yes | - | Produces 8 pizzas. |

Salary note: public summaries describe entry-level employees as salary-free and trained employees as salary-bearing. Before implementing a visual card renderer, verify the salary icon from card images or a physical copy.

### Training Paths

| Track | Path |
| --- | --- |
| Manager | Management Trainee -> Junior Vice President -> Vice President -> Senior Vice President -> Executive Vice President |
| Pricing | Pricing Manager -> Luxuries Manager or Discount Manager |
| Recruiting | Recruiting Girl -> Recruiting Manager -> HR Director |
| Training | Trainer -> Coach -> Guru |
| Buyers | Errand Boy -> Cart Operator -> Truck Driver -> Zeppelin Pilot |
| Marketing | Marketing Trainee -> Campaign Manager -> Brand Manager -> Brand Director |
| Kitchen | Kitchen Trainee -> Burger Cook -> Burger Chef |
| Kitchen | Kitchen Trainee -> Pizza Cook -> Pizza Chef |
| Other trained jobs | Non-entry employees outside the marketeer/kitchen/buyer tracks are trained from manager cards. The exact card-bottom arrows for Waitress, New Business Developer, Local Manager, Regional Manager, and CFO should be verified before implementation. |

Implementation note: the rulebook says marketeers, kitchen staff, and buyers each have their own upgrade track; other non-entry employees are trained from managers. Use card-bottom training arrows as final authority.

### Milestone Cards

Milestones are awarded immediately when a player satisfies the condition. Other players can also claim the same milestone during that same turn. During cleanup, remaining unclaimed copies of any milestone type claimed that turn are removed from availability.

| Milestone | Qty | Trigger | Effect |
| --- | ---: | --- | --- |
| First to hire 3 people in 1 turn | 3 | Hire at least 3 employees in one turn. | Immediately gain 2 Management Trainees on the beach; they may be trained later that same turn if training remains. |
| First to throw away drink/food | 6 | Discard food or drink during cleanup. | Gain freezer capacity 10 for future cleanup phases. Cannot store items on the turn this milestone is gained. |
| First Waitress played | 6 | Play a Waitress in the company structure. | Waitresses earn $5 instead of $3, including the triggering waitress. |
| First to have $20 | 3 | Have at least $20 cash at any time, usually after Dinnertime before Payday. | May inspect face-down reserve cards. |
| First to have $100 | 3 | Have at least $100 cash at end of Dinnertime. | CEO counts as CFO from next turn onward. Player may not keep or train a CFO. |
| First to lower prices | 6 | Play a Pricing Manager or Discount Manager in structure. | Permanent unit price -$1. Mandatory and immediate. |
| First to train someone | 6 | Train any employee. | Permanent $15 salary discount each Payday. Mandatory; salary cannot go below $0. |
| First Burger produced | 3 | Produce at least 1 burger. | Immediately gain a Burger Cook if available. |
| First Pizza produced | 3 | Produce at least 1 pizza. | Immediately gain a Pizza Cook if available. |
| First Errand Boy played | 6 | Play an Errand Boy in structure. | Buyers get +1 drink from each source; applies immediately. |
| First Cart Operator played | 6 | Play a Cart Operator in structure. | Cart Operators, Truck Drivers, and Zeppelin Pilots get +1 range; applies immediately. |
| First to pay $20 or more in salaries | 3 | Actually pay at least $20 in salaries during Payday after all mandatory discounts. | May combine training actions from multiple trainers/coaches/gurus on the same employee. |
| First Billboard placed | 6 | Place a billboard campaign. | No salaries for marketeers; all future campaigns are eternal, including the triggering billboard. The marketeer remains busy forever. |
| First Burger marketed | 6 | Place a campaign advertising burgers. | +$5 income per burger sold. Does not affect customer choice and is not doubled by gardens. |
| First Pizza marketed | 6 | Place a campaign advertising pizza. | +$5 income per pizza sold. Does not affect customer choice and is not doubled by gardens. |
| First Drink marketed | 6 | Place a campaign advertising any drink. | +$5 income per drink sold, for all drink types. Does not affect customer choice and is not doubled by gardens. |
| First Airplane campaign | 3 | Place an airplane campaign. | Count +2 open slots for determining order of business. |
| First Radio campaign | 3 | Place a radio campaign. | Radios place 2 demand tokens of the advertised good on each reached house, capacity permitting. |

## Turn Structure

Each round has seven phases.

### 1. Restructuring

Players simultaneously choose employees to put at work. The CEO is always at work. All other employees not chosen are on the beach. At-work cards must form a pyramid:

- CEO at top.
- CEO slots accept normal employees or managers.
- Manager slots accept normal employees only, not other managers.
- If the structure is illegal due to too many cards, only the CEO works and all others go to the beach.
- Busy marketeers are outside the structure, do not use slots, and are usually unavailable.

### 2. Order of Business

Players count open slots in their legal structure. More open slots chooses turn order earlier. Ties use prior turn order. The airplane milestone adds 2 virtual open slots for this count only.

### 3. Working 9:00-5:00

Players act in turn order. Each player completes all actions before the next player acts. Actions occur in this rules order, regardless of org-chart position.

1. **Recruit.** CEO always hires 1 entry employee. Recruiting employees add hire actions. Hired cards go to the beach. If an entry deck is empty, it cannot be hired unless immediately trained onward that turn.
2. **Train.** Training affects beach employees only, including newly hired employees. At-work employees and busy marketeers cannot be trained. Normally a card cannot be trained more than once per turn unless using a Coach/Guru or the salary milestone.
3. **Initiate marketing campaigns.** Marketeers may place campaigns by their allowed campaign type, range, and duration. They become busy until the campaign ends, or forever if the eternal-marketing milestone applies.
4. **Get food and drinks.** Kitchen staff produce burgers/pizzas. Buyers gather drinks from supply or from map sources depending on role.
5. **Place/move restaurants.** Local and Regional Managers expand or reposition the chain.
6. **Place houses/gardens.** New Business Developer adds a house or garden.

Mandatory actions: price managers, discount managers, luxury managers, CFO, recruiting manager, HR director, and waitress effects are mandatory when relevant. Other employee actions are optional.

### 4. Dinnertime

Houses are processed in printed house-number order, lowest first.

For each house:

- If it has no demand tokens, it does not eat.
- A chain must be road-connected and able to supply the full demanded menu. Partial fulfillment is not allowed.
- If one chain qualifies, it serves the house.
- If multiple chains qualify, customers compare each chain's **unit price + road distance**.
- Standard unit price is $10, modified by active pricing/luxury/discount employees and permanent price milestones.
- Distance follows roads to the closest usable restaurant entrance. Drive-in managers make every corner an entrance while active.
- Lowest unit-price-plus-distance wins.
- Remaining ties go to most waitresses in structure, then earlier turn order.
- The chosen chain must serve. Demand tokens and matching stock are discarded.
- Income per item is unit price plus relevant item bonuses.
- Gardens double the unit price portion only, not milestone bonuses.

After all houses:

- Waitress income is paid.
- CFO/CEO-as-CFO adds 50% to cash earned that turn, rounded up.
- If the bank cannot pay income, it breaks.

### Breaking the Bank

First break:

- Reveal chosen reserve cards.
- Add their money total to the bank.
- Determine new CEO slot count by majority among reserve-card slot icons; tied counts use the highest tied slot number.
- New CEO slot count applies from the next turn.

Second break:

- Finish Dinnertime, recording any money owed if needed.
- Game ends immediately after Phase 4.
- Payday is skipped.
- Most cash wins; tied players use turn order.

### 5. Payday

Players may fire any number of employees in structure or on the beach before paying wages. Fired cards return to supply. Busy marketeers normally cannot be fired.

Then pay $5 for each salary-bearing card in structure, on the beach, and busy if applicable. Apply mandatory discounts from milestones and unused Recruiting Manager/HR Director capacity. Salary cannot go below $0.

If a player cannot pay a busy marketeer after firing all other salary-bearing employees, the marketeer must be fired and the campaign stays on the board.

### 6. Marketing Campaigns

Campaigns resolve by printed campaign number, lowest first. Each house can hold at most 3 demand tokens, or 5 if it has a garden.

| Campaign | Reach |
| --- | --- |
| Billboard | Orthogonally adjacent houses/gardens. |
| Mailbox | Houses in the same road-bounded block; roads stop spread, other map elements do not. |
| Airplane | Houses in the covered line of 1, 3, or 5 rows/columns from board edge. |
| Radio | Houses on the radio tile and adjacent 8 tiles. With the radio milestone, places 2 matching demand tokens where capacity permits. |

After a non-eternal campaign runs, remove one advertising token. If none remain, return the marketing tile and marketeer. Otherwise, the campaign and busy marketeer remain.

### 7. Cleanup

- Players without the freezer milestone discard leftover food/drinks.
- Players with the freezer milestone may store up to 10 tokens.
- Return structure and beach cards to hand.
- Flip "coming soon" restaurants to active.
- Remove unclaimed copies of any milestone type claimed this turn.
- Demand tokens and campaign tokens stay on the board.
- Start the next round.

## Marketing Placement Rules

- Billboard, mailbox, and radio tiles must be placed on empty board squares adjacent to a road.
- Range normally starts from any of your restaurant entrances and follows connected roads across map tiles.
- Marketing Trainee and Campaign Manager have road range limits.
- Brand Manager and Brand Director ignore placement range limits, but non-airplane campaigns still need road adjacency.
- Airplanes are placed at the board edge and cover the corresponding number of full rows or columns. They do not use road range.
- A campaign may be placed even if it reaches no houses.
- Campaign duration is 1 up to the marketeer's maximum.

## Restaurant Placement Rules

Initial restaurant placement:

- Must fit fully on empty squares.
- Must not cover roads, drinks, houses, or restaurants.
- Entrance must border a road.
- Entrance may not be on the same tile as another restaurant entrance.

Later restaurant placement:

- Must still fit on empty squares and connect entrance to road.
- The same-tile entrance restriction no longer applies.
- Local Manager places within road range 3 and restaurant opens next turn.
- Regional Manager places or moves anywhere valid and restaurant is active immediately.
- Active Local/Regional Manager grants drive-in entrances at all restaurant corners for the chain during Dinnertime.

## House and Garden Placement Rules

- New houses may be placed on any empty area if connected to at least one road.
- Gardens attach to a printed map house over two squares, forming a 2x3 house/garden rectangle.
- Gardens require empty squares.
- Each printed house can have at most one garden.
- Houses placed by New Business Developer include a garden by default and cannot receive another garden.

## Data Modeling Notes for Web Implementation

Useful state objects:

- `Game`: players, map, supply, milestones, bank, reserve state, turn number, phase.
- `Player`: chain id, cash, hand, beach, structure, busy marketeers, stock, restaurants, milestones, permanent modifiers.
- `EmployeeCardDefinition`: id, name, quantity, type, entry, salary, unique, slots, range, actions, trainTo.
- `MilestoneDefinition`: id, name, quantity, trigger event, immediate effect, permanent modifiers.
- `MapTile`: 5x5 grid, roads, printed houses, drink sources, rotation.
- `Restaurant`: owner, tile/squares, entrance orientation, active/comingSoon.
- `Campaign`: type, owner, tile/edge placement, good advertised, remaining duration, eternal, busy chip.
- `House`: printed/placed, location, garden, demand tokens, number.

Important event hooks:

- `onEmployeePlayed`
- `onEmployeeHired`
- `onEmployeeTrained`
- `onFoodProduced`
- `onDrinkCollected`
- `onCampaignPlaced`
- `onCashChanged`
- `onSalaryPaid`
- `onCleanupDiscard`
- `onBankBreak`

Rules that will need careful tests:

- Dinnertime customer choice and ties.
- Garden income math.
- Negative prices, if supported by FAQ interpretation.
- Reserve-card CEO slot majority and ties.
- Busy/eternal marketeer lifecycle.
- Milestones claimed by multiple players in the same turn.
- Training availability when intermediate cards are unavailable.
- Hiring from empty entry decks when immediately training onward.
- Salary discounts being mandatory.
- Final turn skips Payday after the second bank break.

## Open Verification Items

- Confirm every salary icon against physical/card-image sources before rendering final digital cards.
- Confirm exact training arrows printed on each card, especially "other" roles trained from Management Trainee.
- Confirm whether the target implementation should include common FAQ rulings such as negative prices and bankruptcy handling.
- Decide whether the app should model physical component limits strictly or use FAQ-unlimited proxies for food/drinks and milestones.
- Decide whether to implement the introductory game as a learn-mode preset.
