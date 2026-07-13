---
path: "2026/07/14/the-taste-was-never-in-the-ink/"
date: "2026-07-14"
title: "The taste was never in the ink"
tags: ["rescript", "typescript", "tooling"]
cover: "./blog.nojaf.com-the-taste-was-never-in-the-ink.png"
backgroundPosition: "initial"
photoCredit:
  author: "Evan Wise"
  username: "evanthewise"
  photoId: "a-walkway-leading-to-a-monument-in-a-park-KTpByahkagc"
---

## Intro

I maintain the ticket sales for a small running race in Elverdinge. Ten miles, a shorter 8 km loop, a kids run, a few hundred runners, one weekend a year. It is the kind of project you could build with just about anything. The first version was written in ReScript, which was and is as solid a pick as any.

I want to tell you why the newest one is plain TypeScript, and why the person who wrote the first version would have found that embarrassing. The honest answer is not "TypeScript is better." It isn't. The honest answer is that I stopped being the one writing the code, and once that happened, almost everything I believed about picking a language quietly stopped being true.

## An acquired taste

For a long time I had a rule I never said out loud: whatever is popular is probably not the best way to do it. JavaScript is the obvious case. It is everywhere, and it is also full of sharp edges, so surely the interesting move is to look for something better. I spent the better part of a decade looking.

I started with Elm. It was my gateway drug into typed functional programming on the frontend: a friendly compiler that made illegal states genuinely unrepresentable, and the famous promise of no runtime exceptions. It ruined me for the ordinary way of doing things. Once you have felt a compiler catch what would otherwise have been a production bug, plain JavaScript feels like walking around with your shoelaces tied together.

From Elm I moved to F# through Fable, which compiles F# to JavaScript, chasing the same idea one language further. And then I settled, finally, on ReScript: sound types, real sum types, exhaustive pattern matching, a compiler that means it, and the tightest fit of the three to the JavaScript and React world I was actually shipping into. Elm taught me to want it, F# stretched it further, and ReScript felt like the pragmatic place to stay.

Every one of those moves was the same bet: the niche, more-correct tool is worth the tax, and I paid the tax happily. I wrote tooling. I built things most people would never build, because building them was the point.

This app is where that stopped being theory. Its earlier versions were my first real ReScript project, the place the language went from something I admired to something I shipped and maintained. And it is a monument to that taste. The domain lived in one file of clean algebraic types:

```ReScript
type race =
  | TenMiles
  | EightKm

type ticket =
  | Runner(runner)
  | Walker(walker)
```

And everywhere I touched a race, the compiler forced me to handle both cases:

```ReScript
let oppositeRace = (race: Domain.race): Domain.race => {
  switch race {
  | TenMiles => EightKm
  | EightKm => TenMiles
  }
}
```

If I ever added a third race, every `switch` in the codebase would light up red until I dealt with it. That is a genuinely good feeling. I am not going to pretend it isn't.

## The moment I caught myself

Somewhere along the way, the way I actually build software changed. I stopped typing most of the code. An LLM types it now, and my job changed shape: I describe, I review, I nitpick until it is exactly what I want, and a lot of the time I don't even need to nitpick, because the result is fine. Different from how I would have written it, but not wrong. Working with a model turns out to be a lot like working with another developer. You have to let go of the idea that there is only one right way, yours.

And the model was _bad_ at ReScript. Not incapable, just weaker. ReScript has moved through several versions over the years, and the model would confidently reach for the old idioms, the syntax from three releases ago. I wrote instruction files to keep it modern. I handheld. And then, because I am who I am, I went further: I started building a custom language server whose entire purpose was to feed the model more context about ReScript so it would stop making these mistakes.

I got a long way into that before it hit me. I was building infrastructure to prop up a language _for the benefit of the machine_, solving a problem that simply does not exist in the popular language. In TypeScript the model already knows everything. There is nothing to prop up. I was, very elaborately, subsidizing my own taste, and the bill had quietly become enormous.

That was the flinch. After that, the rewrite was already decided. I just hadn't admitted it yet.

## The thing I thought I'd lose, and didn't

The objection writes itself: but you _gave up the exhaustive types_. The `switch` that forces every case. Surely that hurts.

Here is what I found when I actually did it. The exhaustiveness didn't go anywhere. TypeScript checks it too, just differently:

```ts
export const RACES = ["10-miles", "8-km"] as const;
export type Race = (typeof RACES)[number];

export const RACE_LABELS: Record<Race, string> = {
  "10-miles": "Ten Miles",
  "8-km": "8 km",
};
```

Add a third race to `RACES` and `RACE_LABELS` fails to compile until I fill it in. Not quite the _same_ guarantee, though. ReScript checked every `switch` for free; TypeScript only catches this because `Record<Race, ...>` demands every key, and for arbitrary branching I have to reach for an explicit exhaustiveness check and remember to write it. The safety is identical only where I go and ask for it, which for this app, mostly mapping over a closed set of cases, is enough. It is a habit I keep now rather than a promise the compiler keeps for me. And at the actual boundary, where a real HTTP request arrives, I get a runtime validator that is the _same object_ as the type:

```ts
race: z.enum(RACES),
```

### And yes, ReScript could do the same

To be fair to the language I left, ReScript can do this too. There are libraries like Sury that give you the same schema-is-the-type trick, and I never even got around to trying them. So this is not a capability ReScript lacks. It is that in TypeScript, zod is simply the road everyone is already standing on: it is the obvious default, it is what the model reaches for without being asked, and it is what I get without having to go shopping for a library first. The difference is convenience, not power, and convenience is exactly the axis that starts to matter most once you are no longer the one doing the typing.

### What I actually lost

So what did I really lose? Not safety, not really, so long as I keep that habit. I lost the _pleasure of writing it_. ReScript is genuinely nicer to write by hand, and that is exactly the point I had been missing for months: **the elegance of a language is a benefit to the person typing it.** It is an authoring benefit, and I am barely the author anymore. Every reason I loved that language only paid out while my hands were on the keyboard, and my hands have largely left it.

## Reading and writing came apart

Reading code and writing it are two different relationships, and for my whole career they were welded together: if a language was unpleasant to write, I called it an unpleasant language, because writing was most of my contact with it.

But I never really minded _reading_ TypeScript. It is explicit and familiar; I can open a file I have never seen and follow it, and so can anyone else. What I never loved was _writing_ it, the ceremony and the small daily papercuts of getting a type to line up, and that is exactly the half ReScript made nicer. The model pried the two apart. Writing is mostly its job now; reading and reviewing are mostly mine, and reviewing TypeScript turns out to be pretty painless. It is weak precisely where I no longer feel it and strong where I now live.

Which quietly shifted what I even mean by good code: with a non-deterministic model, it often matters less how a problem gets solved than whether the result is easy to read and easy to check. Legibility beats elegance now, because legibility is the part I still personally consume.

## Ecosystem gravity is the real win

The unglamorous truth of this rewrite is not any single feature. It is that in a huge, boring, well-known ecosystem, _the bindings already exist_.

In the old version I maintained my own ReScript bindings to Firebase, as a git dependency, by hand. Think about that. Before I could store a document I had to first manufacture the types for the thing that stores the document. In TypeScript I manufacture nothing. Firebase, Stripe, Express, React, all of it ships with types, and the model is fluent in every one of them because it has read a million examples of each. It rarely trips on them, and on the rare occasion it does, my linter catches it before I ever see it.

That is the whole equation. In the niche world I paid an authoring tax (write the bindings, prop up the tooling, keep the model on the modern syntax) to buy correctness. In the popular world the correctness is mostly just _there_, sitting in the ecosystem, and the model draws on it for free. Once I am not the author, the niche tax has no upside left to justify it.

## What I refused to give up

I did not just surrender and run `create-astro`. There is a version of this story where I become a pure consumer, taking whatever the defaults hand me, and it isn't true. There are principles I picked up in all those niche years that I flatly refuse to drop.

TypeScript will happily let you write sloppy, half-typed, implicit code. I don't allow it. Not through a compiler this time, but by hand, with a custom lint rule that enforces the beliefs the old compiler used to enforce for me:

```jsonc
"tenmiles/annotate-non-primitives": "error",
"typescript/explicit-function-return-type": "error",
"typescript/no-restricted-types": ["error", {
  "types": {
    "Omit": { "message": "Omit is banned. Define a new type explicitly." },
    "Pick": { "message": "Pick is banned. Define a new type explicitly." },
    "ReturnType": { "message": "ReturnType is banned. Use the concrete type directly." }
  }
}]
```

### The type has to be on the page

The one I care about most is a small custom rule I wrote called `annotate-non-primitives`, and it is worth slowing down on, because the principle behind it is the whole philosophy of the rewrite in miniature.

TypeScript's type inference is extraordinarily good. That sounds like a pure virtue, and mostly it is, but it carries a cost almost nobody says out loud: inference lets the type _disappear from the source_. You write

```ts
const rect = el.getBoundingClientRect();
```

and the compiler knows precisely what `rect` is. The reader does not. Not without hovering over it in an editor, or mentally re-running the inference, or trusting that it is probably fine. The type is real, and it is invisible. Multiply that by a whole codebase and you get files that are correct but that you cannot actually _read_: to understand them you have to become a compiler.

My rule refuses that bargain. If the type of a value is not obvious from a plain literal, you have to write it down. `const total = 42` is fine; the type is sitting right there in the digits. `const rect = el.getBoundingClientRect()` is not fine, it has to become `const rect: DOMRect = ...`, so that the reader sees what they are dealing with at the exact spot the value is introduced, rather than three hovers away. The same instinct is why I banned `Omit`, `Pick`, and `ReturnType`: each one hides a concrete shape behind a derivation, and I would rather the shape be spelled out where a human (or a model) can just read it.

And the reader I am really building for is not only me; it is the model on its next pass. An LLM does not hover, does not summon a language server, does not get the type on demand the way I can in an editor. It reads the flat text everyone else sees and works out from context what each value is. An explicit annotation deletes that guesswork: the type is right there in the line it is already reading. Types were always useful for the ordinary reasons, catching mistakes and documenting intent; here they pick up a second job as the most reliable thing I can leave lying around to keep the model oriented.

Notice what that rule optimizes for. It costs the _writer_ a few keystrokes to buy the _reader_ a type they can see with no tooling at all. When you write your own code that is an annoying trade, which is presumably why stock TypeScript never forces it. In my world it is a wildly good one: the writer paying the cost is now mostly the model, which does not sigh at a few keystrokes, and the reader collecting the benefit is me, doing the one job I did not hand away.

So: everything is explicitly typed, and the clever type-level gymnastics that hide what a shape really is are banned outright. Same person who loved ReScript, same convictions, different mechanism. I did not change my mind about what good code is, only about how to make it happen. Old me picked a niche language whose compiler guaranteed my beliefs; new me stays in the mainstream and re-imposes them by hand, on tools the whole world already uses.

### The tooling renaissance

JavaScript is in the middle of a quiet renaissance in its own plumbing: oxc with oxlint and oxfmt, tsgo, Bun, Rolldown, a wave of projects rewriting the boring, load-bearing parts from scratch. This is not a speed complaint about ReScript, which compiles fast and always has; on raw speed these are more or less on par. What pulls me is the pace, and the honest explanation is who is doing the work. These come from teams of paid engineers whose whole job is to keep pushing, and it shows: they move fast, and keep the whole thing open enough that I could bolt my own lint rule on without asking. ReScript is a labor of love carried by volunteers, and it evolves when it evolves. Both are honorable; they are just on different clocks, and the funded one is sprinting.

Which is not a bad horse to bet on in the LLM age, because fast and open together is exactly what it rewards. The loop runs the linter, the formatter, and the type checker constantly as the model and I trade turns, and stays out of the way tightly enough that I stop noticing it is there. That is about the highest compliment I know how to pay a toolchain.

### Falling for Bun

And then there is Bun, which I have quietly fallen in love with. Because the whole thing is just TypeScript now, Bun simply _runs_ it. No build step to test a script, no compile-then-execute dance, no separate artifact. My shared types are imported as raw `.ts` by both the app and the functions, and a maintenance script is `bun script.ts` and nothing else. It is such a good developer experience that it feels like cheating.

There is a small, uncomfortable argument hiding in that. I used to treat popularity as a warning sign. It isn't proof of quality, plenty of graceless tools are wildly popular, but it buys something narrower and, for me, more useful: attrition. A tool millions rely on gets its worst edges sanded down fast, and every one of those rough spots has already been written up somewhere the model has read. Someone suffered through it first so I don't have to, and wrote it down where the machine could learn it. The niche path means being the one who suffers first, every time. There was a season of my life when that was the fun part. These days I would rather the road were already paved.

And yes, the obvious objection: oxc, tsgo, and Bun are themselves young, hardly the settled mainstream I say I made peace with. But youth and obscurity are not the same axis. Each already pulls more downloads in a week than ReScript ever did, and each arrived with that momentum almost from day one. They are the crowd, just early. New does not mean niche. What I walked away from was never newness. It was being the only one in the room.

## Keeping the model in line

The other thing I kept is harder to see in a diff, and I think it is the real craft now. You do not get good results out of a model by accident; you shape the ground it works on. This repo has an `AGENTS.md` that encodes every convention. The Firestore types carry paragraphs of rationale, not because I forgot what they do, but because that is where the model reads _why_, and reasons better for it. There is an executable check that drives the emulator and asserts the invariants you cannot see from the UI. None of that is glamorous. All of it is the thing that makes the previous years pay off. The taste didn't disappear when I stopped picking exotic languages. It relocated, up out of the code itself and into the environment the model works inside.

## The table of contents

### Bending the knee

So here is where I landed, and I will say it plainly. I bent the knee. I took the popular, mainstream, slightly-less-elegant thing that five years ago I would have looked down on, and I built with it on purpose. I used to be someone who made tools and picked the harder, better-in-theory path; I am, more and more, someone who consumes what the big ecosystems hand me and gets on with it. I would be lying if I said I felt nothing about that.

None of this is a law. It is one small hobby project and one workflow, mine at the time of writing, and if you are still the one writing most of your own code the niche language is still the better tool, its pleasures still real. The trade has a cost, too, and not all of it is mine to feel. The model being weak at ReScript is not a fact of nature but partly a verdict people like me keep voting for: we leave the niche for the model's sake, and every departure, mine included, makes the next model weaker still. It is a loop, and I just fed it. That custom language server I walked away from was real work, the kind that grows a small ecosystem into a bigger one, and if enough of us stop paying that tax there is no knee left to bend, just the one road for everybody. Something real is lost when enough of us make this choice, and I am not going to pretend it away.

But I am not going to perform regret I don't have, either. The result is not a compromise. This is the best version of this project that has ever existed: more polished, more correct at the boundaries, better tested, and easier to change than anything I built when I was proving a point. I bent the knee, and what I got back was the thing I wanted the whole time, a race that runs smoothly and a codebase I am genuinely proud of.

### The front of the book

For ten years I was sure the taste lived in the language: in the tight pattern match, in the pipe that flowed, in the compiler that meant every word. I was sure it lived in the ink, in the small private pleasure of setting the lines down with my own hands.

It didn't. I handed the pen to the machine, and the thing I was most afraid of losing did not leave with it. That a type be visible on the page, that a shape be legible, that a boundary hold, that the next reader never has to guess: all of it stayed, because none of it was ever in the writing. It was in the caring, and the caring turned out to be portable.

So I set the pen down and walked to the front of the book. I keep the table of contents now: which chapters exist, what order they run in, which ones earn their place and which get cut, and the standard every page is held to. That is not a smaller seat. It is the one place you can see the whole book at once. The ink dries on other hands these days, and that is fine, because the taste was never in the ink. It was in the table of contents all along, and that part is still mine to keep.

All the best,

Florian
