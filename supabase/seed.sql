-- ReadRage Seed Data: 7 Categories & 42 Absurd Products (stock_count = 0)

-- Clean old seed data if needed
delete from public.products;
delete from public.categories;

-- Insert Categories
insert into public.categories (id, slug, name) values
  ('11111111-1111-1111-1111-111111111101', 'fiction-of-regret', 'Fiction of Regret'),
  ('11111111-1111-1111-1111-111111111102', 'non-fiction-allegedly', 'Non-Fiction (Allegedly)'),
  ('11111111-1111-1111-1111-111111111103', 'self-help-makes-it-worse', 'Self-Help (Makes It Worse)'),
  ('11111111-1111-1111-1111-111111111104', 'childrens-books-unsettling', 'Children''s Books (Unsettling)'),
  ('11111111-1111-1111-1111-111111111105', 'cookbooks-unaffordable', 'Cookbooks for Ingredients You Cannot Afford'),
  ('11111111-1111-1111-1111-111111111106', 'cursed-stationery', 'Cursed Stationery'),
  ('11111111-1111-1111-1111-111111111107', 'miscellaneous-air', 'Miscellaneous Air');

-- Insert 42 Absurd Products
insert into public.products (id, category_id, title, author, description, price_amount, price_currency_symbol, stock_count, image_emoji) values
  -- Fiction of Regret
  ('22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111101', 'A Book About Nothing (Blank)', 'Anonymous Nihilist', '350 pages of crisp, guilt-inducing cream bond paper with zero ink applied.', 49999.99, '₹', 0, '📖'),
  ('22222222-2222-2222-2222-222222222202', '11111111-1111-1111-1111-111111111101', 'The Email You Sent at 2:14 AM', 'Mortimer Shivering', 'A thriller about hitting reply-all to the entire executive leadership committee.', 0.01, '₹', 0, '📧'),
  ('22222222-2222-2222-2222-222222222203', '11111111-1111-1111-1111-111111111101', 'Someone Else Was Right on the Internet', 'C. D. Argumentative', 'A tragic tragedy where a stranger refuses your citations and sleeps peacefully.', 139999.00, '₹', 0, '⌨️'),
  ('22222222-2222-2222-2222-222222222204', '11111111-1111-1111-1111-111111111101', 'Should Have Bought Bitcoin in 2010', 'Hindsight McPain', 'Every chapter is just the current market price printed in bold 72pt font.', 888888.88, '₹', 0, '📉'),
  ('22222222-2222-2222-2222-222222222205', '11111111-1111-1111-1111-111111111101', 'The Cutlery That Walked Away', 'Inspector Drawer', 'Whodunit where your favorite fork vanishes into the fourth dimension.', 12.50, '₹', 0, '🍴'),
  ('22222222-2222-2222-2222-222222222206', '11111111-1111-1111-1111-111111111101', 'Yesterday’s Unsent Apology', 'W. H. Cowardice', 'Poetry written in draft folders that you deleted right before dawn.', 420.69, '₹', 0, '🥀'),

  -- Non-Fiction (Allegedly)
  ('22222222-2222-2222-2222-222222222207', '11111111-1111-1111-1111-111111111102', 'The Entire Dictionary Minus The Letter E', 'G. Perec Tribute Band', 'A rigorous lexigraphic endeavor omitting humanity''s most ubiquitous glyph.', 9999999.99, '₹', 0, '🔤'),
  ('22222222-2222-2222-2222-222222222208', '11111111-1111-1111-1111-111111111102', 'One Left Sock: A Memoir', 'Sole Survivor', 'The harrowing tale of being separated from righty in the tumble dryer spin cycle.', 89.90, '₹', 0, '🧦'),
  ('22222222-2222-2222-2222-222222222209', '11111111-1111-1111-1111-111111111102', '10,000 Reasons Why Pigeons Stare At You', 'Dr. Avian Paranoia', 'Peer-reviewed evidence that urban birds are silently assessing your posture.', 27500.00, '₹', 0, '🐦'),
  ('22222222-2222-2222-2222-222222222210', '11111111-1111-1111-1111-111111111102', 'A Complete History of Beige Walls', 'Archibald Boring', 'Nine volumes charting the subtle despair of institutional eggshell paint.', 500.00, '₹', 0, '🧱'),
  ('22222222-2222-2222-2222-222222222211', '11111111-1111-1111-1111-111111111102', 'How to Pretend You Understood the Meeting', 'Vice President Synergy', 'Definitive corporate handbook on nodding sagely and saying "let''s take that offline".', 75000.00, '₹', 0, '👔'),
  ('22222222-2222-2222-2222-222222222212', '11111111-1111-1111-1111-111111111102', 'Encyclopedia of Awkward Silences', 'The Lurker', 'Catalog of every gap in conversation recorded between 1994 and yesterday.', 1000.01, '₹', 0, '🤐'),

  -- Self-Help (Makes It Worse)
  ('22222222-2222-2222-2222-222222222213', '11111111-1111-1111-1111-111111111103', 'Overthinking: An Advanced Masterclass', 'Prof. Mind Spiral', 'Learn how to extract 14 distinct insult vectors from a thumbs-up emoji.', 3499.00, '₹', 0, '🧠'),
  ('22222222-2222-2222-2222-222222222214', '11111111-1111-1111-1111-111111111103', 'How to Lose Friends and Bother People', 'D. Carnage', 'Actionable techniques to ensure no one invites you to weekend brunch ever again.', 99.00, '₹', 0, '🗣️'),
  ('22222222-2222-2222-2222-222222222215', '11111111-1111-1111-1111-111111111103', 'Procrastination for Overachievers', 'Due Tomorrow, Do Tomorrow', 'Why complete tasks today when panic provides superior cardiovascular stimulation?', 0.05, '₹', 0, '⏳'),
  ('22222222-2222-2222-2222-222222222216', '11111111-1111-1111-1111-111111111103', 'The Subtle Art of Making Every Room Cold', 'Thermostat Tyrant', 'Dominate your family members through uncompromising baseline micro-climates.', 64200.00, '₹', 0, '❄️'),
  ('22222222-2222-2222-2222-222222222217', '11111111-1111-1111-1111-111111111103', 'Manifesting Catastrophes Through Sheer Will', 'Doom Prophet', 'If you worry about it 24/7, maybe the universe will just give in to appease you.', 77777.77, '₹', 0, '🌪️'),
  ('22222222-2222-2222-2222-222222222218', '11111111-1111-1111-1111-111111111103', 'Sitting Uncomfortably With Your Choices', 'Guru Squirm', 'Posture guidelines for reliving high school blunders while lying in bed.', 19999.00, '₹', 0, '🪑'),

  -- Children''s Books (Unsettling)
  ('22222222-2222-2222-2222-222222222219', '11111111-1111-1111-1111-111111111104', 'Goodnight Room, Goodnight Dread', 'Margaret Wise Spook', 'Illustrated bedtime poem whispering about all the shadows that didn''t leave at dawn.', 1450.00, '₹', 0, '🛏️'),
  ('22222222-2222-2222-2222-222222222220', '11111111-1111-1111-1111-111111111104', 'The Little Teapot Who Screamed', 'Nursery Nightmare', 'Short and stout, until the water boiled away and it discovered existential awareness.', 3200.50, '₹', 0, '🫖'),
  ('22222222-2222-2222-2222-222222222221', '11111111-1111-1111-1111-111111111104', 'Where The Wild Things File Taxes', 'Maurice S. Audit', 'Max gets sent to bed without dinner and spends 40 years reconciling receipts.', 89999.00, '₹', 0, '👹'),
  ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111104', 'Harold and the Invisible Purple Abyss', 'Crayon of Terror', 'He drew a door in the air, walked through it, and never saw a polygon again.', 4999.99, '₹', 0, '🖍️'),
  ('22222222-2222-2222-2222-222222222223', '11111111-1111-1111-1111-111111111104', 'The Very Hungry Caterpillar Who Ate Concrete', 'Eric C. Crunch', 'A charming board book ending abruptly on page four with severe structural indigestion.', 750.00, '₹', 0, '🐛'),
  ('22222222-2222-2222-2222-222222222224', '11111111-1111-1111-1111-111111111104', 'Curious George and the Terms of Service', 'H. A. Rey-morse', 'George signs away his biometric telemetry and intellectual property rights.', 12000.00, '₹', 0, '🐒'),

  -- Cookbooks for Ingredients You Cannot Afford
  ('22222222-2222-2222-2222-222222222225', '11111111-1111-1111-1111-111111111105', 'Artisanal Rainwater Braised in Regret', 'Chef Pierre pretentious', 'Ingredients: 4 drops of virgin precipitation gathered over Lake Como, a single glance.', 499999.00, '₹', 0, '🌧️'),
  ('22222222-2222-2222-2222-222222222226', '11111111-1111-1111-1111-111111111105', 'White Truffles Fed Only to Racehorses', 'Lord Saffron', 'Pre-heat oven to 450° and throw away your annual rent in 14 aromatic minutes.', 8750000.00, '₹', 0, '🍄'),
  ('22222222-2222-2222-2222-222222222227', '11111111-1111-1111-1111-111111111105', 'The Luxury of Boiling Saltwater', 'Sea Merchant', 'A Michelin-star guide to reducing water until nothing remains except white dust.', 18000.00, '₹', 0, '🧂'),
  ('22222222-2222-2222-2222-222222222228', '11111111-1111-1111-1111-111111111105', 'Edible 24k Gold Foil for Broke Students', 'Alchemist Ramen', 'How to plate instant noodles so you look majestic while suffering malnutrition.', 99999.99, '₹', 0, '🍜'),
  ('22222222-2222-2222-2222-222222222229', '11111111-1111-1111-1111-111111111105', 'Toast: The Unattainable Sourdough Dream', 'Baker Snob', 'Requires a starter culture fermented in 1842 and three generations of patience.', 25000.00, '₹', 0, '🍞'),
  ('22222222-2222-2222-2222-222222222230', '11111111-1111-1111-1111-111111111105', 'Endangered Sturgeon Tears on Toast', 'Gourmet Malice', 'Extremely salty, morally reprehensible, and visually indistinguishable from water.', 14200000.00, '₹', 0, '🐟'),

  -- Cursed Stationery
  ('22222222-2222-2222-2222-222222222231', '11111111-1111-1111-1111-111111111106', 'The Pen That Only Writes When Tested', 'BiC Poltergeist', 'Flawless line on scratch paper, absolute vacuum when signing your legal deed.', 49.99, '₹', 0, '🖊️'),
  ('22222222-2222-2222-2222-222222222232', '11111111-1111-1111-1111-111111111106', 'Sticky Notes That Refuse All Adhesion', 'Post-It Betrayal', 'Falls gracefully to the floor the exact second you turn your back to fetch coffee.', 120.00, '₹', 0, '🗒️'),
  ('22222222-2222-2222-2222-222222222233', '11111111-1111-1111-1111-111111111106', 'The Stapler That Chews and Never Binds', 'Swingline Demon', 'Transforms pristine office documents into mangled confetti with a terrifying metallic crunch.', 850.00, '₹', 0, '📎'),
  ('22222222-2222-2222-2222-222222222234', '11111111-1111-1111-1111-111111111106', 'Correction Tape That Smears Everything', 'Tipp-Ex Malevolence', 'Coats your minor spelling mistakes in an opaque ribbon of grease and shame.', 65.00, '₹', 0, '🩹'),
  ('22222222-2222-2222-2222-222222222235', '11111111-1111-1111-1111-111111111106', 'Notebook With Pages Made of Wet Tissue', 'Papyrus Frailty', 'Dissolves upon contact with human perspiration or mild humidity.', 299.00, '₹', 0, '📓'),
  ('22222222-2222-2222-2222-222222222236', '11111111-1111-1111-1111-111111111106', 'Scissors That Only Cut Leftward and Jagged', 'Shear Spite', 'Engineered to turn clean rectangular wrapping paper into an angry staircase.', 380.00, '₹', 0, '✂️'),

  -- Miscellaneous Air
  ('22222222-2222-2222-2222-222222222237', '11111111-1111-1111-1111-111111111107', 'Used Air — 2nd Edition', 'Atmospheric Syndicate', 'Gently inhaled in Zürich, expelled into a sterile borosilicate ampoule.', 150000.00, '₹', 0, '💨'),
  ('22222222-2222-2222-2222-222222222238', '11111111-1111-1111-1111-111111111107', 'Pre-Storm Humidity Sealed in a Jar', 'Barometric Collector', 'Smells like static electricity, wet grass, and the panic of laundry left outside.', 8800.00, '₹', 0, '🏺'),
  ('22222222-2222-2222-2222-222222222239', '11111111-1111-1111-1111-111111111107', 'The Scent of an Unopened Book You Will Never Read', 'Bibliophile Guilt', 'A synthetic aroma compound distilled from pure aspirational delusion.', 45000.00, '₹', 0, '🕯️'),
  ('22222222-2222-2222-2222-222222222240', '11111111-1111-1111-1111-111111111107', 'Zero Gravity Nitrogen (Vintage 1999)', 'Orbit Vault', 'Captured outside Mir space station during a quiet Tuesday afternoon.', 99999999.99, '₹', 0, '🛰️'),
  ('22222222-2222-2222-2222-222222222241', '11111111-1111-1111-1111-111111111107', 'Pure Breath of a Sleeping Librarian', 'Silentium Noctis', 'Guaranteed to possess a noise level strictly below 12 decibels.', 320000.00, '₹', 0, '🤫'),
  ('22222222-2222-2222-2222-222222222242', '11111111-1111-1111-1111-111111111107', 'A Literal Vacuum in a Bubble Envelope', 'Absolute Zero Corp', 'Contains precisely nothing, certified at 0.00000001 Pascals.', 1999999.00, '₹', 0, '📦');
