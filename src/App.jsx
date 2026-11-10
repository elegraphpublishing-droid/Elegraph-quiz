import React, { useState } from 'react';

const QUESTIONS = [
  {
    id: 'w1',
    type: 'warmup',
    title: 'Question 1 of 10',
    subtitle: 'When people hear how you got where you are, what do they usually say?',
    options: [
      { label: '"You should write about that."', value: 'A' },
      { label: '"I never knew that about you."', value: 'B' },
      { label: '"How did you do that?"', value: 'C' },
      { label: 'Nobody has said anything like that yet.', value: 'D' }
    ]
  },
  {
    id: 'w2',
    type: 'warmup',
    title: 'Question 2 of 10',
    subtitle: 'Have you ever wished you could hand someone a book instead of explaining your story again?',
    options: [
      { label: 'Many times', value: 'A' },
      { label: 'Once or twice', value: 'B' },
      { label: 'I have never thought about it', value: 'C' }
    ]
  },
  {
    id: 'q1',
    type: 'scored',
    title: 'Question 3 of 10',
    subtitle: 'Where is your book right now?',
    options: [
      { label: 'Only in my head', score: 'storyteller', val: 'A' },
      { label: 'I know the topic and have rough notes', score: 'builder', val: 'B' },
      { label: 'I have chapters or a full draft', score: 'refiner', val: 'C' },
      { label: 'It is written and needs to reach readers', score: 'launcher', val: 'D' },
      { label: 'I am still deciding whether a book is right for me', score: 'explorer', val: 'E' }
    ]
  },
  {
    id: 'q2',
    type: 'scored',
    title: 'Question 4 of 10',
    subtitle: 'How much of your story is written down anywhere?',
    options: [
      { label: 'Almost none', score: 'storyteller', val: 'A' },
      { label: 'Bits and pieces', score: 'builder', val: 'B' },
      { label: 'A lot, but scattered across notes, voice notes and posts', score: 'refiner', val: 'C' },
      { label: 'All of it sits in a manuscript', score: 'launcher', val: 'D' }
    ]
  },
  {
    id: 'q3',
    type: 'scored',
    title: 'Question 5 of 10',
    subtitle: 'If you sat down to write this week, what would stop you?',
    options: [
      { label: 'I would not know where to start', score: 'storyteller', val: 'A' },
      { label: 'I would not have the time to organise it', score: 'builder', val: 'B' },
      { label: 'I would doubt that it is good enough', score: 'refiner', val: 'C' },
      { label: 'I would not know how to get it to readers', score: 'launcher', val: 'D' },
      { label: 'I am not sure a book is worth the effort', score: 'explorer', val: 'E' }
    ]
  },
  {
    id: 'q4',
    type: 'scored',
    title: 'Question 6 of 10',
    subtitle: 'How clear are you on who the book is for?',
    options: [
      { label: 'Not yet', score: 'storyteller', val: 'A' },
      { label: 'I have a rough idea', score: 'builder', val: 'B' },
      { label: 'Very clear', score: 'refiner', val: 'C' },
      { label: 'Very clear, and I have an audience waiting', score: 'launcher', val: 'D' }
    ]
  },
  {
    id: 'q5',
    type: 'scored',
    title: 'Question 7 of 10',
    subtitle: 'What do you want most right now?',
    options: [
      { label: 'Someone to help me find the book inside my experience', score: 'storyteller', val: 'A' },
      { label: 'Someone to turn my ideas into structure and pages', score: 'builder', val: 'B' },
      { label: 'Someone to sharpen what I already have', score: 'refiner', val: 'C' },
      { label: 'Someone to publish and promote it', score: 'launcher', val: 'D' },
      { label: 'Someone to show me what a book could do for me', score: 'explorer', val: 'E' }
    ]
  },
  {
    id: 'role',
    type: 'profile',
    title: 'Question 8 of 10',
    subtitle: 'Which describes you best?',
    options: [
      { label: 'Founder or business owner', val: 'founder' },
      { label: 'Senior executive', val: 'executive' },
      { label: 'Public figure or office holder', val: 'public' },
      { label: 'Expert or consultant', val: 'expert' },
      { label: 'Other', val: 'other' }
    ]
  },
  {
    id: 'purpose',
    type: 'profile',
    title: 'Question 9 of 10',
    subtitle: 'What should the book do for you?',
    options: [
      { label: 'Build my authority', val: 'authority' },
      { label: 'Leave a legacy', val: 'legacy' },
      { label: 'Grow my business', val: 'business' },
      { label: 'Teach and impact people', val: 'impact' }
    ]
  },
  {
    id: 'timeline',
    type: 'profile',
    title: 'Question 10 of 10',
    subtitle: 'When would you like it in readers\' hands?',
    options: [
      { label: 'Within 3 months', val: '3m' },
      { label: 'Within 6 months', val: '6m' },
      { label: 'Within a year', val: '12m' },
      { label: 'No date yet', val: 'none' }
    ]
  }
];

const RESULTS_DATA = {
  storyteller: {
    name: 'The Storyteller',
    meaning: 'You have the experience and the wisdom. The book exists in you and has not been pulled out yet.',
    nextStep: 'Pick one idea you keep repeating to people. Record yourself explaining it for 10 minutes. List the three moments in your life that prove it.',
    howWeHelp: 'We run interviews with you, find the book inside your answers, and map the chapters. You talk and we shape it.',
    closing: 'Want us to look at your answers with you? Send us a message and we will take it from there.',
    waMessage: 'Hi Elegraph, I just took the quiz and my result was The Storyteller. I would like to talk about my next step.'
  },
  builder: {
    name: 'The Builder',
    meaning: 'Your idea is clear. It needs structure and hands to carry it.',
    nextStep: 'Write the one sentence your reader should believe by the last page. Gather every note, post and speech into
