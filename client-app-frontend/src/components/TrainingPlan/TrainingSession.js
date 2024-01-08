import React from 'react';

const TrainingSession = ({trainingData}) => {
  const cwiczenia = [
    {
      nazwa: 'Przysiady',
      opis: 'Podstawowe ćwiczenie siłowe angażujące wiele grup mięśniowych.',
      iloscSeri: 3,
      ciezar: '60 kg',
      iloscPowtorzen: 12,
    },
    {
      nazwa: 'Wyciskanie sztangi leżąc',
      opis: 'Ćwiczenie rozwoju mięśni klatki piersiowej.',
      iloscSeri: 4,
      ciezar: '80 kg',
      iloscPowtorzen: 10,
    },
    {
      nazwa: 'Martwy ciąg',
      opis: 'Skomplikowane ćwiczenie angażujące wiele grup mięśniowych, zwłaszcza plecy i nogi.',
      iloscSeri: 3,
      ciezar: '100 kg',
      iloscPowtorzen: 8,
    },
    // Dodaj więcej ćwiczeń według potrzeb
  ];

  return (
    <div>
      <h1>Trening na Siłowni</h1>
      {cwiczenia.map((cwiczenie, index) => (
        <div key={index}>
          <h2>{cwiczenie.nazwa}</h2>
          <p><strong>Opis:</strong> {cwiczenie.opis}</p>
          <p><strong>Ilość serii:</strong> {cwiczenie.iloscSeri}</p>
          <p><strong>Ciężar:</strong> {cwiczenie.ciezar}</p>
          <p><strong>Ilość powtórzeń:</strong> {cwiczenie.iloscPowtorzen}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default TrainingSession;
