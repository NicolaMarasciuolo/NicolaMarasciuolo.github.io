// FILE DA MODIFICARE: qui inserisci novità e pubblicazioni.
// Per aggiungere una voce copia un blocco {...}, incollalo e cambia i testi (virgola dopo ogni blocco).
// abbr: sigla della rivista, mostrata come etichetta colorata (cambiala o toglila). type: "journal" oppure "conference". Per link o abstract che non hai, lascia "".

const NEWS = [
  { date: "Nov 2026", text: "My new website is online." },
  { date: "2026", text: "Paper on chirality effects in the stability of periodic lattices published in Meccanica." }
];

const PUBLICATIONS = [
  { year: 2026, type: "conference", abbr: "LNME", title: "Collapse of Symmetrical Masonry Arches with Frictional Joints Due to Supports Settlements",
    authors: "F. Trentadue, D. De Tommasi, N. Marasciuolo, G. Vitucci", venue: "Lecture Notes in Mechanical Engineering", details: "pp. 167–174",
    doi: "https://doi.org/10.1007/978-3-032-17231-0_21", abstract: "" },
  { year: 2026, type: "journal", abbr: "Meccanica", title: "Chirality effects in the stability analysis of periodic lattice with generic rigid finite size joints",
    authors: "N. Marasciuolo, D. De Tommasi, F. Trentadue", venue: "Meccanica", details: "61(2), 49",
    doi: "https://doi.org/10.1007/s11012-026-02109-3", abstract: "" },
  { year: 2025, type: "journal", abbr: "Structures", title: "A new approach to the limit analysis of masonry structures as assemblies of rigid-plastic blocks with frictional sliding contacts",
    authors: "F. Trentadue, D. De Tommasi, N. Marasciuolo", venue: "Structures", details: "76",
    doi: "https://doi.org/10.1016/j.istruc.2025.108895", abstract: "" },
  { year: 2025, type: "journal", abbr: "EML", title: "Tailored multiscale instabilities in a grid metamaterial",
    authors: "N. Marasciuolo, D. De Tommasi, F. Trentadue, G. Vitucci", venue: "Extreme Mechanics Letters", details: "75",
    doi: "https://doi.org/10.1016/j.eml.2024.102284", abstract: "" },
  { year: 2024, type: "journal", abbr: "Acta Mech", title: "Thrust in a symmetric masonry arch with frictional joints on spreading supports",
    authors: "F. Trentadue, D. De Tommasi, N. Marasciuolo, G. Vitucci", venue: "Acta Mechanica", details: "235(2)",
    doi: "https://doi.org/10.1007/s00707-023-03759-0",
    abstract: "" },
  { year: 2023, type: "journal", abbr: "EJM A/Solids", title: "Elastic stability of a lattice of cross-braced shear deformable beams",
    authors: "F. Trentadue, G. Caramia, D. De Tommasi, N. Marasciuolo, G. Vitucci", venue: "European Journal of Mechanics, A/Solids", details: "102",
    doi: "https://doi.org/10.1016/j.euromechsol.2023.105118",
    abstract: "" },
  { year: 2023, type: "conference", abbr: "MRP", title: "Stability domain and optimal design of a metamaterial made-up of a beam lattice with diagonal cables",
    authors: "F. Trentadue, D. De Tommasi, G. Caramia, N. Marasciuolo", venue: "Materials Research Proceedings", details: "26, pp. 493–498",
    doi: "https://doi.org/10.21741/9781644902431-80", abstract: "" },
  { year: 2022, type: "journal", abbr: "MRC", title: "Optimization of tensegral roofs for innovative greenhouses",
    authors: "D. De Tommasi, S. Fuina, N. Marasciuolo, G. Scarascia-Mugnozza, F. Trentadue", venue: "Mechanics Research Communications", details: "125",
    doi: "https://doi.org/10.1016/j.mechrescom.2022.103975",
    abstract: "" },
  { year: 2021, type: "journal", abbr: "AES", title: "Stability domain and design of a plane metamaterial made up of a periodic mesh of rods with cross-bracing cables",
    authors: "F. Trentadue, D. De Tommasi, N. Marasciuolo", venue: "Applications in Engineering Science", details: "5",
    doi: "https://doi.org/10.1016/j.apples.2021.100036",
    abstract: "" }
];
