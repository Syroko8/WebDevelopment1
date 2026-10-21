export type Pregunta = {
  id: string;
  texto: string;
  opciones: string[];
  correcta: number; // índice de la opción correcta
};

export const PREGUNTAS: Pregunta[] = [
  {
    id: "q1",
    texto: "¿Qué hook añade memoria a un componente?",
    opciones: ["useEffect", "useState", "useRef", "useContext"],
    correcta: 1,
  },
  {
    id: "q2",
    texto: "¿Qué atributo necesita cada elemento de una lista hecha con map()?",
    opciones: ["id", "key", "index", "ref"],
    correcta: 1,
  },
  {
    id: "q3",
    texto: "¿Cómo se pasan datos de un componente padre a un hijo?",
    opciones: ["props", "state", "hooks", "CSS"],
    correcta: 0,
  },
  {
    id: "q4",
    texto: "¿Qué extensión tienen los componentes React con TypeScript?",
    opciones: [".ts", ".js", ".tsx", ".css"],
    correcta: 2,
  },
];
