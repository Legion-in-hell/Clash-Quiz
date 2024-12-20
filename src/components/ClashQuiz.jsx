import React, { useState } from "react";
import { Shield, Swords, Crown } from "lucide-react";
import "./styles/card.css";

const CardType = {
  STANDARD: "standard",
  RED: "red",
  BLACK: "black",
};

const ClashQuiz = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      type: CardType.STANDARD,
      isRevealed: false,
      question: "Question facile 1",
      difficulty: "Facile",
    },
    {
      id: 2,
      type: CardType.STANDARD,
      isRevealed: false,
      question: "Question facile 2",
      difficulty: "Facile",
    },
    {
      id: 3,
      type: CardType.STANDARD,
      isRevealed: false,
      question: "Question facile 3",
      difficulty: "Facile",
    },
    {
      id: 4,
      type: CardType.RED,
      isRevealed: false,
      question: "Question moyenne 1",
      difficulty: "Moyen",
    },
    {
      id: 5,
      type: CardType.RED,
      isRevealed: false,
      question: "Question moyenne 2",
      difficulty: "Moyen",
    },
    {
      id: 6,
      type: CardType.BLACK,
      isRevealed: false,
      question: "Question difficile",
      difficulty: "Difficile",
    },
  ]);

  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const createSmokeEffect = (type, cardElement) => {
    const rect = cardElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Créer plusieurs particules
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement("div");
      particle.className = `smoke-particle ${type}`;

      // Calculer un angle aléatoire pour une dispersion en cercle
      const angle = (i / 12) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const distance = 70 + Math.random() * 40;

      // Calculer la destination de la particule
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      // Positionner la particule au centre de la carte
      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;

      // Définir la direction d'animation
      particle.style.setProperty("--tx", `${tx}px`);
      particle.style.setProperty("--ty", `${ty}px`);

      document.body.appendChild(particle);

      // Supprimer la particule après l'animation
      setTimeout(() => particle.remove(), 600);
    }
  };

  const handleCardClick = (cardId, event) => {
    if (!gameStarted) return;

    setCards(
      cards.map((card) => {
        if (card.id === cardId && !card.isRevealed) {
          createSmokeEffect(card.type, event.currentTarget);
          return { ...card, isRevealed: true };
        }
        return card;
      })
    );
  };

  const Card = ({ card }) => {
    const styles = {
      [CardType.STANDARD]: {
        gradient: "from-blue-600 via-blue-500 to-blue-700",
        border: "border-blue-300",
        text: "text-blue-100",
      },
      [CardType.RED]: {
        gradient: "from-red-600 via-red-500 to-red-700",
        border: "border-red-300",
        text: "text-red-100",
      },
      [CardType.BLACK]: {
        gradient: "from-gray-900 via-purple-900 to-black",
        border: "border-purple-400",
        text: "text-purple-100",
      },
    }[card.type];

    return (
      <div className="w-32 h-48 perspective-1000">
        <div
          onClick={(e) => handleCardClick(card.id, e)}
          className={`relative preserve-3d card-flip cursor-pointer ${
            card.isRevealed ? "card-flipped" : "hover:scale-105"
          }`}
        >
          {/* Face cachée */}
          <div className="absolute w-full h-full backface-hidden">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 rounded-xl shadow-xl" />
              <div className="absolute inset-1 rounded-lg border-2 border-amber-600/50" />
              <div className="absolute inset-2 rounded-lg border border-amber-500/30 bg-amber-600/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-bold text-amber-300 drop-shadow-lg">
                  ?
                </span>
              </div>
            </div>
          </div>

          {/* Face révélée */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180">
            <div className="relative w-full h-full">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} rounded-xl shadow-xl`}
              />
              <div
                className={`absolute inset-1 rounded-lg border-2 ${styles.border} opacity-50`}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-between p-3">
                <div className={`${styles.text} text-sm font-semibold`}>
                  {card.difficulty}
                </div>

                <div className="flex-shrink-0">
                  {card.type === CardType.STANDARD && (
                    <Shield className="w-10 h-10 text-white" />
                  )}
                  {card.type === CardType.RED && (
                    <Swords className="w-10 h-10 text-white" />
                  )}
                  {card.type === CardType.BLACK && (
                    <Crown className="w-10 h-10 text-white" />
                  )}
                </div>

                <div className={`${styles.text} text-center text-sm px-1`}>
                  {card.question}
                </div>

                <div className="text-center mt-1">
                  <div className="text-white text-sm font-bold">
                    {card.type === CardType.STANDARD && "+1 / 0"}
                    {card.type === CardType.RED && "+2 / -1"}
                    {card.type === CardType.BLACK && "+3 / -3"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-yellow-500 mb-6 drop-shadow-lg">
            Clash-Quiz
          </h1>
          <div className="flex justify-center items-center gap-6">
            <div className="bg-yellow-900/50 p-4 rounded-xl backdrop-blur-sm">
              <Crown className="text-yellow-500 w-8 h-8 inline mr-3" />
              <span className="text-yellow-100 text-2xl font-bold">
                {score}
              </span>
            </div>
            {!gameStarted && (
              <button
                onClick={() => setGameStarted(true)}
                className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg hover:shadow-green-500/20"
              >
                Commencer le jeu
              </button>
            )}
          </div>
        </div>

        {/* Terrain de jeu */}
        <div className="relative">
          <div className="bg-gradient-to-br from-amber-900/30 to-amber-800/30 rounded-2xl p-8 border-2 border-amber-700/50 backdrop-blur-sm">
            <div className="grid grid-cols-3 gap-6 justify-items-center">
              {cards.map((card) => (
                <Card key={card.id} card={card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClashQuiz;
