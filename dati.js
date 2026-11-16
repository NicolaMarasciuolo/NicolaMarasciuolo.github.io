// FILE DA MODIFICARE: qui inserisci novità e pubblicazioni.
// Per aggiungere una voce copia un blocco {...}, incollalo e cambia i testi (virgola dopo ogni blocco).
// type: "journal" oppure "conference". Per link o abstract che non hai, lascia "".

const NEWS = [
  { date: "Nov 2026", text: "My new website is online." },
  { date: "2026", text: "Paper on chirality effects in the stability of periodic lattices published in Meccanica." }
];

const PUBLICATIONS = [
  { year: 2026, type: "conference", title: "Collapse of Symmetrical Masonry Arches with Frictional Joints Due to Supports Settlements",
    authors: "F. Trentadue, D. De Tommasi, N. Marasciuolo, G. Vitucci", venue: "Lecture Notes in Mechanical Engineering", details: "pp. 167–174",
    doi: "https://doi.org/10.1007/978-3-032-17231-0_21", abstract: "" },
  { year: 2026, type: "journal", title: "Chirality effects in the stability analysis of periodic lattice with generic rigid finite size joints",
    authors: "N. Marasciuolo, D. De Tommasi, F. Trentadue", venue: "Meccanica", details: "61(2), 49",
    doi: "https://doi.org/10.1007/s11012-026-02109-3", abstract: "" },
  { year: 2025, type: "journal", title: "A new approach to the limit analysis of masonry structures as assemblies of rigid-plastic blocks with frictional sliding contacts",
    authors: "F. Trentadue, D. De Tommasi, N. Marasciuolo", venue: "Structures", details: "76",
    doi: "https://doi.org/10.1016/j.istruc.2025.108895", abstract: "" },
  { year: 2025, type: "journal", title: "Tailored multiscale instabilities in a grid metamaterial",
    authors: "N. Marasciuolo, D. De Tommasi, F. Trentadue, G. Vitucci", venue: "Extreme Mechanics Letters", details: "75",
    doi: "https://doi.org/10.1016/j.eml.2024.102284", abstract: "" },
  { year: 2024, type: "journal", title: "Thrust in a symmetric masonry arch with frictional joints on spreading supports",
    authors: "F. Trentadue, D. De Tommasi, N. Marasciuolo, G. Vitucci", venue: "Acta Mechanica", details: "235(2)",
    doi: "https://doi.org/10.1007/s00707-023-03759-0",
    abstract: "The effect of a supports settlement in a symmetric masonry arch is studied by modeling the arch as a system of rigid plastic blocks with frictional sliding. It is shown that in a collapse state due to a horizontal settlement the thrust attains its minimum statically admissible value, so extending to the case of frictional sliding a well-known result of standard limit analysis, which considers collapse states only due to the opening of joints. The case of both vertical and horizontal settlements is also analyzed. It is demonstrated that the collapse thrust in case of horizontal settlement is a lower bound for the collapse thrust in case of generic settlement. Extensive numerical analyses illustrate the above results." },
  { year: 2023, type: "journal", title: "Elastic stability of a lattice of cross-braced shear deformable beams",
    authors: "F. Trentadue, G. Caramia, D. De Tommasi, N. Marasciuolo, G. Vitucci", venue: "European Journal of Mechanics, A/Solids", details: "102",
    doi: "https://doi.org/10.1016/j.euromechsol.2023.105118",
    abstract: "A plane metamaterial made up of a periodic square grid of shear deformable beams has been braced by crossing cables. This coupling, widely adopted in structural engineering, is here applied with the aim of enhancing the stability performance of a periodic material. Under suitable assumptions, analytical solutions for a rich variety of critical modes and the stability domain are determined by the Bloch wave approach and the effectiveness of our analytical results has been verified by numerical simulations. Furthermore, the experimental response of a specimen, in which hierarchical beams composed by lower order elements are modeled as equivalent shear deformable beams, has shown a satisfactory agreement with our analytical solutions. We argue that our analytical model can be efficiently used to tailor the buckling response of various new metamaterials under general plane stress states." },
  { year: 2023, type: "conference", title: "Stability domain and optimal design of a metamaterial made-up of a beam lattice with diagonal cables",
    authors: "F. Trentadue, D. De Tommasi, G. Caramia, N. Marasciuolo", venue: "Materials Research Proceedings", details: "26, pp. 493–498",
    doi: "https://doi.org/10.21741/9781644902431-80", abstract: "" },
  { year: 2022, type: "journal", title: "Optimization of tensegral roofs for innovative greenhouses",
    authors: "D. De Tommasi, S. Fuina, N. Marasciuolo, G. Scarascia-Mugnozza, F. Trentadue", venue: "Mechanics Research Communications", details: "125",
    doi: "https://doi.org/10.1016/j.mechrescom.2022.103975",
    abstract: "In this work we propose a new type of covering structures for greenhouses based on a tensegral conception with the aim of matching economical and sustainability requirements. We develop a minimal weight design procedure, considering all relevant load conditions. Strength constraints, local stability constraints and deflection constraints are imposed. Load conditions, stability, strength and deflection checks are carried out according to European technical rules. A global stability check of the optimized structure is performed a posteriori. The design variables are the joint positions, the cross section areas of members and the rest lengths of members, determining the initial prestress state. A relevant reduction of the structural weight with respect a previous design has been achieved. The effectiveness of our approach has been confirmed by a FEM analysis in which the whole greenhouse structure has been checked." },
  { year: 2021, type: "journal", title: "Stability domain and design of a plane metamaterial made up of a periodic mesh of rods with cross-bracing cables",
    authors: "F. Trentadue, D. De Tommasi, N. Marasciuolo", venue: "Applications in Engineering Science", details: "5",
    doi: "https://doi.org/10.1016/j.apples.2021.100036",
    abstract: "In this work we examine a plane metamaterial subjected to a generic biaxial macrostress, obtained by coupling a periodic mesh of rods with a periodic mesh of extremely flexible cables. In particular, we couple a square mesh of rods with diagonal cables with the aim of enhancing the stability performance of the obtained metamaterial. By introducing appropriate restrictions on the feasible critical modes, the study can be framed into the context of the Eulerian stability analysis and then, by means of Floquet-Bloch theory, a closed form solution for the stability domain is determined. Finally, on the basis of the previous stability analysis the optimal design problem is addressed." }
];
