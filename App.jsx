import React, { useState, useEffect } from 'react';

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
    nextStep: 'Write the one sentence your reader should believe by the last page. Gather every note, post and speech into one folder.',
    howWeHelp: 'We turn your material into a blueprint, then write and edit the chapters in your voice. You approve every stage.',
    closing: 'Want us to look at your answers with you? Send us a message and we will take it from there.',
    waMessage: 'Hi Elegraph, I just took the quiz and my result was The Builder. I would like to talk about my next step.'
  },
  refiner: {
    name: 'The Refiner',
    meaning: 'The raw material is there and you are close. What it needs is an expert eye.',
    nextStep: 'Stop adding. Read what you have in one sitting and mark where you lose interest.',
    howWeHelp: 'We run a manuscript diagnostic, then edit and proofread until the book reads clean and sounds like you.',
    closing: 'Want us to look at your answers with you? Send us a message and we will take it from there.',
    waMessage: 'Hi Elegraph, I just took the quiz and my result was The Refiner. I would like to talk about my next step.'
  },
  launcher: {
    name: 'The Launcher',
    meaning: 'The book is ready or nearly ready. Readers have to find it.',
    nextStep: 'Decide the one result you want from the launch, such as sales, speaking invitations or clients.',
    howWeHelp: 'We handle the cover, interior, ISBN, distribution, launch plan and your author brand.',
    closing: 'Want us to look at your answers with you? Send us a message and we will take it from there.',
    waMessage: 'Hi Elegraph, I just took the quiz and my result was The Launcher. I would like to talk about my next step.'
  },
  explorer: {
    name: 'The Explorer',
    meaning: 'You are curious and not sold yet. That is a good place to decide from, because nobody pressured you into it.',
    nextStep: 'Write down the three questions people ask you most often. If the same ones keep coming back, a book can answer them for you.',
    howWeHelp: 'We have a short conversation about your story and tell you honestly whether a book makes sense for you now.',
    closing: 'Want something short to help you decide? Message us and we will send it to you.',
    waMessage: 'Hi Elegraph, I just took the quiz and my result was The Explorer. I would like the short piece you mentioned.'
  }
};

const PURPOSE_LINES = {
  authority: 'A book is the strongest proof of expertise you can hand a stranger.',
  legacy: 'Your story deserves to outlive every meeting you have ever held.',
  business: 'The right book brings the right clients to you before the first call.',
  impact: 'Someone out there needs exactly what you know.'
};

export default function App() {
  const [screen, setScreen] = useState('landing'); // landing, quiz, transition, contact, result, privacy
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [contact, setContact] = useState({ firstName: '', email: '', whatsapp: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [resultSlug, setResultSlug] = useState('builder');

  const handleStart = () => {
    setScreen('quiz');
    setCurrentIndex(0);
    setSelectedOption(null);
  };

  const handleSelect = (val) => {
    setSelectedOption(val);
  };

  const handleNext = () => {
    if (!selectedOption) return;
    const currentQ = QUESTIONS[currentIndex];
    const newAnswers = { ...answers, [currentQ.id]: selectedOption };
    setAnswers(newAnswers);
    setSelectedOption(null);

    // Check if we hit the transition screen condition after w2 (index 1)
    if (currentIndex === 1) {
      setScreen('transition');
      return;
    }

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Calculate result
      calculateResult(newAnswers);
      setScreen('contact');
    }
  };

  const handleBack = () => {
    if (screen === 'quiz' && currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setSelectedOption(answers[QUESTIONS[prevIndex].id] || null);
    } else if (screen === 'transition') {
      setScreen('quiz');
      setCurrentIndex(1);
      setSelectedOption(answers['w2'] || null);
    } else if (screen === 'contact') {
      setScreen('quiz');
      setCurrentIndex(QUESTIONS.length - 1);
      setSelectedOption(answers[QUESTIONS[QUESTIONS.length - 1].id] || null);
    }
  };

  const calculateResult = (finalAns) => {
    const counts = { storyteller: 0, builder: 0, refiner: 0, launcher: 0, explorer: 0 };
    QUESTIONS.forEach(q => {
      if (q.type === 'scored') {
        const choiceVal = finalAns[q.id];
        const opt = q.options.find(o => o.val === choiceVal || o.score === choiceVal);
        if (opt && opt.score) {
          counts[opt.score]++;
        }
      }
    });

    // Determine winner with tie-breaking: d > c > b > a > e
    let maxScore = -1;
    let winner = 'explorer';
    const order = ['explorer', 'storyteller', 'builder', 'refiner', 'launcher']; // reverse so later overwrites earlier or check explicit priority

    order.forEach(slug => {
      if (counts[slug] >= maxScore) {
        maxScore = counts[slug];
        winner = slug;
      }
    });

    setResultSlug(winner);
  };

  const handleTransitionContinue = () => {
    setScreen('quiz');
    setCurrentIndex(2); // Move to Q1 (Scored 1)
    setSelectedOption(answers[QUESTIONS[2].id] || null);
  };

  const handleSubmitContact = (e) => {
    e.preventDefault();
    let errs = {};
    if (!contact.firstName.trim()) errs.firstName = 'Please tell us what to call you.';
    if (!contact.email || !contact.email.includes('@')) errs.email = 'That email address looks incomplete. Please check it.';
    if (!contact.whatsapp || contact.whatsapp.length < 5) errs.whatsapp = 'Please add a WhatsApp number with the country code.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setScreen('result');
    }, 800);
  };

  const renderHeader = () => (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', maxWidth: '560px', margin: '0 auto' }}>
      <div onClick={() => setScreen('landing')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <img src="/549973.png" alt="Elegraph Publishing" style={{ height: '36px', width: 'auto' }} />
      </div>
      {screen === 'quiz' && (
        <div style={{ display: 'flex', gap: '4px' }}>
          {QUESTIONS.map((_, idx) => (
            <div key={idx} style={{
              width: '16px',
              height: '6px',
              borderRadius: '3px',
              backgroundColor: idx <= currentIndex ? '#2EC4B6' : '#333335',
              opacity: idx <= currentIndex ? 1 : 0.15
            }} />
          ))}
        </div>
      )}
    </header>
  );

  const renderFooter = () => (
    <footer style={{ textAlign: 'center', padding: '32px 24px', fontSize: '14px', color: '#333335', opacity: 0.7 }}>
      Elegraph Publishing. Turning manuscripts into impact.{' '}
      {(screen === 'result' || screen === 'privacy') && (
        <span>· <span onClick={() => setScreen('privacy')} style={{ color: '#AA2337', cursor: 'pointer', textDecoration: 'underline' }}>Privacy</span></span>
      )}
    </footer>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F6F6', color: '#333335', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        {renderHeader()}

        <main style={{ maxWidth: '560px', margin: '0 auto', padding: '24px 20px' }}>
          {screen === 'landing' && (
            <div style={{ textAlign: 'left', animation: 'fadeIn 0.3s ease' }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#AA2337', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
                FOR LEADERS WITH A STORY
              </div>
              <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '38px', fontWeight: '800', lineHeight: '1.15', color: '#333335', marginBottom: '20px' }}>
                Does your story deserve a book?
              </h1>
              <p style={{ fontSize: '18px', lineHeight: '1.55', color: '#333335', marginBottom: '36px', opacity: 0.9 }}>
                Ten quick questions. You get a result written for your situation, with one step you can take today.
              </p>
              <button onClick={handleStart} style={{
                width: '100%',
                backgroundColor: '#AA2337',
                color: '#F8F6F6',
                border: 'none',
                borderRadius: '12px',
                padding: '18px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(170, 35, 55, 0.2)'
              }}>
                Start the quiz
              </button>
              <div style={{ textAlign: 'center', fontSize: '14px', marginTop: '12px', opacity: 0.7 }}>
                Takes about 3 minutes.
              </div>
            </div>
          )}

          {screen === 'quiz' && (() => {
            const currentQ = QUESTIONS[currentIndex];
            return (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#AA2337', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    {currentQ.title}
                  </div>
                  {currentIndex > 0 && (
                    <button onClick={handleBack} style={{ background: 'none', border: 'none', color: '#333335', fontSize: '14px', cursor: 'pointer', opacity: 0.7 }}>
                      ← Back
                    </button>
                  )}
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: '700', lineHeight: '1.25', marginBottom: '24px', color: '#333335' }}>
                  {currentQ.subtitle}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  {currentQ.options.map((opt, i) => {
                    const val = opt.val || opt.score || opt.label;
                    const isSelected = selectedOption === val;
                    return (
                      <div
                        key={i}
                        onClick={() => handleSelect(val)}
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: isSelected ? '2px solid #AA2337' : '1px solid rgba(51, 51, 53, 0.25)',
                          borderRadius: '12px',
                          padding: '18px 20px',
                          fontSize: '18px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.2s ease',
                          boxShadow: isSelected ? '0 2px 8px rgba(170, 35, 55, 0.1)' : 'none'
                        }}
                      >
                        <span>{opt.label}</span>
                        {isSelected && <span style={{ color: '#AA2337', fontWeight: 'bold' }}>✓</span>}
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={handleNext}
                  disabled={!selectedOption}
                  style={{
                    width: '100%',
                    backgroundColor: selectedOption ? '#AA2337' : '#cccccc',
                    color: '#F8F6F6',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '18px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    cursor: selectedOption ? 'pointer' : 'not-allowed',
                    opacity: selectedOption ? 1 : 0.6
                  }}
                >
                  Continue
                </button>
              </div>
            );
          })()}

          {screen === 'transition' && (
            <div style={{ textAlign: 'center', padding: '40px 0', animation: 'fadeIn 0.3s ease' }}>
              <button onClick={handleBack} style={{ background: 'none', border: 'none', color: '#333335', fontSize: '14px', cursor: 'pointer', opacity: 0.7, marginBottom: '20px', float: 'left' }}>
                ← Back
              </button>
              <p style={{ fontSize: '22px', lineHeight: '1.5', color: '#333335', marginBottom: '40px', fontWeight: '500', clear: 'both' }}>
                A book answers the same questions for you in every room, for years, while you get on with your day. Let\'s see where yours stands.
              </p>
              <button onClick={handleTransitionContinue} style={{
                width: '100%',
                backgroundColor: '#AA2337',
                color: '#F8F6F6',
                border: 'none',
                borderRadius: '12px',
                padding: '18px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Continue
              </button>
            </div>
          )}

          {screen === 'contact' && (
            <div style={{ animation: 'fadeIn 0.3s ease' }}>
              <button onClick={() => setScreen('quiz')} style={{ background: 'none', border: 'none', color: '#333335', fontSize: '14px', cursor: 'pointer', opacity: 0.7, marginBottom: '12px' }}>
                ← Back
              </button>
              <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>Your result is ready.</h2>
              <p style={{ fontSize: '16px', opacity: '0.8', marginBottom: '24px' }}>Where should we send your copy?</p>

              <form onSubmit={handleSubmitContact} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>First name *</label>
                  <input
                    type="text"
                    value={contact.firstName}
                    onChange={e => setContact({ ...contact, firstName: e.target.value })}
                    placeholder="Enter your first name"
                    style={{ width: '100%', height: '56px', padding: '0 16px', borderRadius: '12px', border: errors.firstName ? '2px solid #AA2337' : '1px solid rgba(51,51,53,0.4)', fontSize: '16px', boxSizing: 'border-box', backgroundColor: '#fff' }}
                  />
                  {errors.firstName && <span style={{ color: '#AA2337', fontSize: '13px', marginTop: '4px', display: 'block' }}>{errors.firstName}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Email address *</label>
                  <input
                    type="email5"
                    value={contact.email}
                    onChange={e => setContact({ ...contact, email: e.target.value })}
                    placeholder="you@example.com"
                    style={{ width: '100%', height: '56px', padding: '0 16px', borderRadius: '12px', border: errors.email ? '2px solid #AA2337' : '1px solid rgba(51,51,53,0.4)', fontSize: '16px', boxSizing: 'border-box', backgroundColor: '#fff' }}
                  />
                  {errors.email && <span style={{ color: '#AA2337', fontSize: '13px', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>WhatsApp number *</label>
                  <input
                    type="text"
                    value={contact.whatsapp}
                    onChange={e => setContact({ ...contact, whatsapp: e.target.value })}
                    placeholder="+234 801 234 5678"
                    style={{ width: '100%', height: '56px', padding: '0 16px', borderRadius: '12px', border: errors.whatsapp ? '2px solid #AA2337' : '1px solid rgba(51,51,53,0.4)', fontSize: '16px', boxSizing: 'border-box', backgroundColor: '#fff' }}
                  />
                  <span style={{ fontSize: '13px', opacity: 0.7, marginTop: '4px', display: 'block' }}>Add your country code, for example +234. We use it to send your next step.</span>
                  {errors.whatsapp && <span style={{ color: '#AA2337', fontSize: '13px', marginTop: '4px', display: 'block' }}>{errors.whatsapp}</span>}
                </div>

                <div style={{ fontSize: '13px', opacity: 0.7, lineHeight: '1.4' }}>
                  By continuing, you agree that Elegraph Publishing may send you your result and follow up with you on WhatsApp and email. You can ask us to stop at any time. Read our <span onClick={() => setScreen('privacy')} style={{ color: '#AA2337', cursor: 'pointer', textDecoration: 'underline' }}>Privacy page</span>.
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: '100%',
                    backgroundColor: '#AA2337',
                    color: '#F8F6F6',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '18px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    cursor: submitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {submitting ? 'Working out your result...' : 'Show me my result'}
                </button>
              </form>
            </div>
          )}

          {screen === 'result' && (() => {
            const res = RESULTS_DATA[resultSlug];
            const purposeKey = answers['purpose'];
            const purposeLine = PURPOSE_LINES[purposeKey] || PURPOSE_LINES['authority'];
            const waLink = `https://wa.me/2347047334979?text=${encodeURIComponent(res.waMessage)}`;

            return (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#AA2337', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  YOUR RESULT
                </div>
                <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '38px', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px' }}>
                  {res.name}
                </h1>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#AA2337', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>WHAT THIS MEANS</div>
                  <p style={{ fontSize: '17px', lineHeight: '1.55', margin: 0 }}>{res.meaning}</p>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#AA2337', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>WHAT TO DO NEXT</div>
                  <p style={{ fontSize: '17px', lineHeight: '1.55', margin: 0 }}>{res.nextStep}</p>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#AA2337', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>HOW WE HELP</div>
                  <p style={{ fontSize: '17px', lineHeight: '1.55', marginBottom: '12px' }}>{res.howWeHelp}</p>
                  <p style={{ fontFamily: \'Playfair Display\', fontStyle: 'italic', fontSize: '20px', lineHeight: '1.4', color: '#AA2337', margin: 0 }}>
                    "{purposeLine}"
                  </p>
                </div>

                <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid rgba(51,51,53,0.15)', textAlign: 'center' }}>
                  <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '20px' }}>{res.closing}</p>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block',
                      width: '100%',
                      backgroundColor: '#25D366',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      borderRadius: '12px',
                      padding: '18px',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      boxSizing: 'border-box',
                      boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
                    }}
                  >
                    {resultSlug === 'explorer' ? 'Get your short read on WhatsApp' : 'Message us on WhatsApp'}
                  </a>
                </div>
              </div>
            );
          })()}

          {screen === 'privacy' && (
            <div style={{ animation: 'fadeIn 0.3s ease' }}>
              <button onClick={() => setScreen('landing')} style={{ background: 'none', border: 'none', color: '#333335', fontSize: '14px', cursor: 'pointer', opacity: 0.7, marginBottom: '20px' }}>
                ← Home
              </button>
              <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '16px' }}>Privacy Policy</h1>
              <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '16px' }}>
                At Elegraph Publishing, we respect your privacy and protect your personal information. When you take our Book Readiness Quiz, we collect your name, email address, and WhatsApp number solely to deliver your personalized quiz result and facilitate relevant publishing consultations.
              </p>
              <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '16px' }}>
                We never sell or share your data with third parties. You may request deletion or access to your information at any time by contacting us directly.
              </p>
            </div>
          )}
        </main>
      </div>

      {renderFooter()}
    </div>
  );
}