angular.module('metho.services.references', [])

// Service defining articles for Reference tab
.factory('Articles', function() {
    // Might use a resource here that returns a JSON array
    var articles = [{
        id: 0,
        name: 'Mise en page',
        description: 'Papier, police de caractère, marges, interlignes, paragraphes, titres',
        subPages: [{
            id: 0,
            name: "Papier",
            text: "<p>Le texte est rédigé au <strong>recto</strong> de feuilles blanches, non lignées, de format lettre (8<span class='diag-fract'>1/2</span> x 11).<p>"
        }, {
            id: 1,
            name: "Police de caractère",
            text: "<p>La <strong>même police</strong> de caractère et la même taille doivent être utilisées tout au long du travail. Les titres doivent être de la même taille que le corps du texte.</p><p>Il <strong>recommandé</strong> d'utiliser la police <em>Times New Roman</em>, 12 points, mais le guide de méthodologie ne l'exige pas. Les enseignants peuvent exiger cette police de caractère et cette taille. </p>"
        }, {
            id: 2,
            name: "Marges",
            text: "<p>Les marges sont présentes afin de permettre au correcteur d'inscrire des remarques. Elles <strong>doivent</strong> être les suivantes : </p><ul><li>3,5 cm à gauche et en haut de la page</li><li>3 cm à droite et au bas de la page</li></ul>"
        }, {
            id: 3,
            name: "Interlignes",
            text: "<p>Le texte suivi est rédigé à interligne et demi (1,5).</p><p>Le simple interligne est réservé pour les notes et les références au bas des pages, pour les citations longues (plus de 3 lignes), pour la bibliographie, les listes de tableaux et de figures et pour les annexes.</p><p>Le triple interligne est utilisé entre les paragraphes, et avant et après l'indication d'un titre.</p>"
        }, {
            id: 4,
            name: "Paragraphes",
            text: "<p>Chaque paragraphe doit commencer avec un alinéa équivalent à 5 espaces (touche <em>Tabulation</em>).</p><p>Il ne faut pas écrire une ligne seule d'un nouveau paragraphe au bas d'une page : il faut passer à la page suivante. Il faut toujours faire suivre un titre d'au moins deux lignes de texte.</p><p>Dans un long travail (6 pages ou plus), il convient d'utiliser une seule page pour l'introduction et de la séparer en paragraphes pour chacune de ses parties. Il faut faire de même pour la conclusion.</p>"
        }, {
            id: 5,
            name: "Titres",
            text: "<p>Les titres (INTRODUCTION, CONCLUSION, TABLE DES MATIÈRES, LISTE DES TABLEAUX, DES FIGURES OU DES ILLUSTRATIONS, ANNEXES, BIBLIOGRAPHIE) sont écrits en lettres majuscules non grasses et sont centrées à 5 cm du haut de la page.</p><p>Dans le corps du développement, le titre des idées principales est aligné à gauche, écrit en lettres minuscules et en caractères gras. Il est à interligne triple par rapport au paragraphe précédent et suivant.</p>"
        }, {
            id: 6,
            name: "Caractères italiques",
            text: "<p>Dans le texte, on utilise l'italique pour identifier les éléments suivants : </p><ul><li>Titres d'oeuvres (livres, tableaux, journaux, revues, etc.)</li><li>Les noms propres</li><li>Les expressions et les mots en langue étrangères</li><li>Les devises</li></ul><p>Dans un texte manuscrit, il faut souligner d'un trait les mots qui doivent être en italique.</p>"
        }, {
            id: 7,
            name: "Pagination",
            text: "<p>Les pages précédant l'introduction sont numérotées en chiffres romains minuscules. Il faut compter la page de titre, mais il ne faut pas la paginer.</p><p>On utilise les chiffres arabes pour numéroter les pages du texte. Dans le texte, on compte l'introduction, mais on ne la pagine pas. À partir de la page 2, toutes les pages du travail sont sont paginées, y compris la liste de références, les annexes, s'il y a lieu, et la bibliographie.</p><p> Le chiffre indiquant la page est aligné contre la marge à environ 2,5 cm à l'angle droit supérieur, sans point ni tiret.</p><p>Pour les travaux de plusieurs pages, une page de garde (feuille blanche) peut être ajoutée à la fin du travail, mais on ne le pagine pas.</p>"
        }, {
            id: 8,
            name: "Justification du texte",
            text: "<p>Le corps du texte doit être justifié à l'exception de la bibliographie dont le texte est aligné à droite.</p>"
        }, {
            id: 9,
            name: "Citations",
            text: "<p>Les citations sont des extraits puisés dans les documents consultés lors de l'élaboration du travail. Tout extrait doit correspondre exactement à l'original quant aux mots, à l'ortographe et à la ponctuation. Les mots que l'on ne veut pas reproduire sont remplacés par des points de suspension entre crochets ainsi que les mots que l'on désire ajouter</p><p>Dans le corps du texte, il faut toujours intégrer une citation, soit en utilisant une phrase d'introduction suivit de deux points (:), soit en l'insérant dans la logique de la phrase.</p><p>Une <strong>citation brève</strong>, de trois lignes ou moins, est introduite par le texte et est mise entre chevrons.</p><p>Une <strong>citation longue</strong> qui compte plus de trois ligne, mais moins d'une page, s'inscrit en retrait du texte à environ cinq espaces à gauche et à droite du texte, à interligne simple et sans chevrons.</p><p>Voir le modèle.</p>"
        }],
        icon: 'img/layout.png',
        text: "",
        containsSub: true
    }, {
        id: 1,
        name: 'Ordre de présentation',
        description: 'Page de titre, table des matières, liste des tableaux',
        subPages: [{
            id: 0,
            name: "Page de titre",
            text: "<p>La page de titre doit contenir les éléments nécessaires à l'identification du travail. On retrouve, dans l'ordre, les renseignements suivants : </p><ul><li>1<sup>re</sup> zone : le titre du travail à 7 cm haut de la page; s'il y a lieu, un sous titre</li><li>2<sup>e</sup> zone : la nature du travail (devoir, rapport de laboratoire, essai, commentaire personnel, recherche, production écrite, etc.) et le nom du professeur auquel on présente le travail</li><li>3<sup>e</sup> zone : le nom et le prénom de ou des auteurs (dans ce dernier cas en ordre alphabétique), et groupe matière (code cours) dont les trois premières lettres sont en majuscules</li><li>4<sup>e</sup> zone : le nom de l'école et la date de la remise du travail (au long)</li></ul><p>Chaque information est centrée séparément; si une information requiert plus d'une ligne, chaque ligne devra être centrée en retrait par rapport à la ligne précédente, imitant une pyramide inversée.</p><p>La page de titre ne nécessite aucune ponctuation et aucun mot ne peut y être souligné; ni en caractère gras. Voir le modèle.</p>"
        }, {
            id: 1,
            name: "Table des matières",
            text: "<p>La table des matières doit donner au lecteur une connaissance immédiate de la structure d'ensemble du travail. Elle en présente le contenu par l'indication, en ordre logique, de ses différents titres précédés de leur numéros de page. Le numéro des pages correspondant au début de chacune de ces parties est aligné à la marge de droite. La table des matières reproduit également les titres des pages précédant l'introduction. Dans la plupart des cas, la table des matières ne doit pas excéder une page. Le titre TABLE DES MATIÈRES est en lettres majuscules et centré à 5 cm du haut de la page. Pour indiquer clairement les titres, utiliser les chiffres arabes.</p><p>Voir le modèle.</p>"
        }, {
            id: 2,
            name: "Liste des tableaux, figures ou illustrations",
            text: "<p>Certains travaux comportent des tableaux, des figures, des graphiques, des cartes, des organigrammes, des illustrations, etc. Quand ils ne sont pas importants en nombre, on peut les intégrer à la table des matières. Toutefois, il peut être nécessaire d'en dresser une liste quand leur nombre le justifie. Ces listes prennent place à la suite de la table des matières, précédant le corps du travail.</p><p>Elles comprennent dans un ordre numérique, les titres des tableaux, des figures, ou des illustrations accompagnés de la page où ils paraissent.</p><p>De même, si leur nombre le justifie, les sigles et abréviations peuvent aussi faire l'objet de tables distinctes.</p><p>La première page de chacune des listes est titrée «LISTE DES...» en majuscules et centré à 5 cm du haut de la page; les titres des tableaux, figures ou illustrations sont écrits en lettres minuscules. Enfin, il conviendra de numéroter différemment les divers éléments visuels d'un même travail : par exemple, les tableaux en chiffres arabes et les graphiques en chiffres romains.</p>"
        }, {
            id: 3,
            name: "Corps du texte",
            text: ""
        }, {
            id: 4,
            name: "Annexes",
            text: "<p>Les annexes consistent en des parties additionelles qui complètent le corps du travail mais qui n'y sont pas intégrées. Toutes les annexes doivent être mentionnées dans le corps du texte par une indication entre parenthèses de la façon suivante : (voir annexe p.23), et non par une note de bas de page.</p><p>Les tableaux, les figures, les diagrammes, les graphiques, les illustrations, les lignes du temps, etc., qui constituent souvent une part importante des travaux, doivent donc se retrouve en annexe. Parce que ces divers éléments visuels offrent l'avantage de simplifier la présentation d'informations nombreuses et complexes, la même rigueur doit être apportée à leur présentation matérielle.</p><p>On trouve en annexe : </p><ul><li>des renseignements, des textes ou des notes complémentaires</li><li>des données statistiques</li><li>des citations trop longues pour être intégrées au texte</li><li>des formules mathématiques, des cartes, des plans, des diagrammes, etc.</li></ul><p>Chaque annexe doit contenir toute l'information nécessaire à sa compréhension : on doit donc y trouver un <strong>titre</strong>, une <strong>numérotation</strong> en chiffres romains majuscules, une <strong>légende</strong>, s'il y a lieu, les <strong>explications</strong> appropriées et la <strong>source</strong>. Ces informations s'inscrivent au bas, en minuscules et à interligne simple.</p><p>L'expression ANNEXE I en lettres majuscules se place à 5 cm du haut de la feuille au centre. Deux interlignes plus bas, on écrit le titre de l'annexe en lettres minuscules.</p><p>Dans un travail, on ne remet pas une annexe avec un collage; au besoin, il faut faire une photocopie du montage effectué.</p><p>S'il y a lieu, indiquez au bas de la page, la référence de l'annexe.</p>"
        }, {
            id: 5,
            name: "Bibliographie ou médiagraphie",
            text: "<p>La bibliographie est la liste des ouvrages qui ont servi à la documentation du travail.</p><p>On peut exposer la bibliographie de différentes façons : </p><ul><li>par ordre alphabétique d'auteurs</li><li>par type d'ouvrages consultés : dictionnaire ou encyclopédie, ouvrages généraux, ouvrages spécialisés, articles de périodiques (revues ou journaux), documents audiovisuels, sites Internet</li></ul><p>La liste des ouvrages est à simple interligne. La 2<sup>e</sup> ligne doit être en retrait. Entre chaque description bibliographique, on passe 2 interlignes.</p><p>La première page est titrée BIBLIOGRAPHIE en majuscules à 5 cm du haut au centre.</p>"
        }, {
            id: 6,
            name: "Page de garde",
            text: "<p>Cette page marque la fin du travail et n'est pas numérotée.</p>"
        }],
        icon: 'img/tableOfContents.png',
        text: "",
        containsSub: true
    }, {
        id: 2,
        name: 'Références bibliographiques',
        description: 'Livres, articles de périodique, références éléctroniques, entrevue',
        subPages: [{
            id: 0,
            name: "Livre",
            text: "<p>Éléments dans une référence bibliographique typique pour un livre : </p><ol><li>Le nom de l'auteur en majuscules, le prénom en minuscule</li><li>Le titre du livre en italique</li><li>Le lieu de publication (ne pas confondre avec le lieu d'impression)</li><li>L'éditeur</li><li>La date de publication</li><li>Le nombre de pages</li></ol><p class='left-aligned'>Exemple : GERMAIN, Georges-Hébert. <em>La fureur et l'enchantement</em>, Montréal, Libre Expression, 2010, 499 p.</p><h4>Nom de l'auteur</h4><p><strong>Un seul auteur : </strong>Le nom de l'auteur est noté en majuscule, il est séparé par une virgule du prénom écrit en minuscules avec une majuscule initiale et il est suivi d'un point.</p><p class='left-aligned'>Exemple : LECLERC, Félix.</p><p>Dans la mesure du possible, le prénom sera écrit au long.</p><p><strong>Deux ou trois auteurs : </strong>S'il y a deux ou trois auteurs, le nom et le prénom des auteurs sont écrits à la suite, dans l'ordre de la lecture (tels que sur la couverture), et sont séparés par une virgule ou par la conjonction <em>et</em>.</p><p class='left-aligned'> Exemple : BOURDON, Yves, Jean LAMARRE. (ou) BOURDON, Yves et Jean Lamarre.</p><p><strong>Plusieurs auteurs : </strong>S'il y a plus de trois auteurs, on utilise l'abbréviation <em>et al.</em> (de l'expression latine <em>et alii</em>, signifiant « et les autres ») ou <em>et collab.</em> (abbreviation de « et collaborateurs »).</p><p class='left-aligned'>BÉDARD, Raymond, Jean-François Cardin et al.</p><p><strong>Livre traduit : </strong>On indique la langue de traduction et le nom du ou des traducteurs en minuscules, après le titre.</p><p class='left-aligned'>NELLES, Henry-Vivian. <em>Une brève histoire du Canada</em>, trad. de l'anglais par Lori Saint-Martin et Paul Gagné, Montréal, FIDES, 2005, 330 p.</p><p><strong>Collectif : </strong>S'il s'agit d'un document dont l'auteur n'est pas mentionné, la référence commencera alors par le titre du document. S'il y a un directeur (personne ayant réuni les différent textes constituant l'ouvrage), on indique le ou les noms avec la mention « dir. » entre parenthèses.</p><p class='left-aligned'><em>Le Petit Larousse illustré 2007</em>, Paris, Larousse, 1856 p.</p><p class='left-aligned'>GÉLINAS, Xavier et Lucia Ferretti (dir.). <em>Duplessis son milieu, son époque</em>, Québec, Septentrion, 2010, 513 p.</p><h4>Titre du livre</h4><p>Le titre est en italique (ou souligné en version manuscrite) et suivi d'une virgule. Les titres d'ouvrages prennent une majuscule au premier nom et éventuellement à l'adjectif et à l'article qui le précèdent.</p><p class='left-aligned'>CORBO, Claude. <em>Les États-Unis d'Amérique, les institutions politiques</em>, Québec, Septentrion, 2007, 445 p.</p><h4>Numéro de l'édition</h4><p>S'il y a lieu, on inscrira le numéro de l'édition après le titre du livre.</p><p class='left-aligned'>DICKSON, John A. et Brian YOUNG. <em>Brève histoire socio-économique du Québec</em>, 3<sup>e</sup> édition, Québec, Septentrion, 2005, 382 p.</p><h4>Collection</h4><p>S'il y a lieu, la mention de la collection s'inscrit à la suite du titre et elle est suivie d'une virgule. Le nom « collection » s'abrège en « coll. ».</p><p class='left-aligned'>TREMBLAY, Miville. <em>Le Pays en otage</em>, coll. Presses HEC, Montréal, Québec/Amérique, 1995, 345 p.</p><h4>Le lieu, l'éditeur la date de publication et le nombre de page</h4><p>Le lieu de la publication (généralement une ville), noté en minuscules et suivi d'une virgule, précède le nom de l'éditeur et l'année de publication.</p><p class='left-aligned'>Montréal, Boréal, 2010.</p><h4>Exceptions</h4><ul><li>si la date n'apparait pas, on indique s.d. (sans date)</li><li>si le lieu n'apparait pas, on indique s.l. (sans lieu)</li><li>si ni la date ni le lieu sont indiqués, on écrit s.l.n.d. (sans lieu ni date)</li></ul><p>On utilise l'abbréviation « p. » pour page. Quand l'ouvrage comprend plusieurs volumes, on écrit le nombre du volume avant l'indication du nombre de pages à l'aide de l'abbréviation « vol. », par exemple : vol. 2, 345 p.</p>"
        }, {
            id: 1,
            name: "Article de périodique",
            text: "<p>Éléments dans une référence bibliographique typique pour un article de périodique : </p><ol><li>Le nom de l'auteur en majuscules, le prénom en minuscule</li><li>Le titre de l'article entre chevrons</li><li>Le titre du périodique en italique</li><li>Le numéro de l'édition, du volume ou du périodique</li><li>La date de publication</li><li>L'indication des pages de l'article</li></ol><p class='left-aligned'>NIVAT, Anne. «Afghanistan, de l'autre côté du miroir», <em>L'actualité</em>, vol 36, no 4, 15 mars 2011, p. 36-44.</p>"
        }, {
            id: 2,
            name: "Référence électronique",
            text: "<h3>Site Internet</h3><p>Éléments dans une référence bibliographique typique pour un site Internet : </p><ol><li>Nom de l'auteur ou de l'organisme en majuscule suivi d'une virgule et prénom en minuscule</li><li>Le titre de l'article entre chevrons</li><li>Le titre de la page d'accueil en italique</li><li>Type de support («[en ligne]»)</li><li>Adresse électronique (URL, <em>Uniform Ressource Locator</em>) du site entre crochets</li><li>Date de consultation entre parenthèses (si mentionné, précédé de la date de mise en ligne)</li></ol><h4>Avec nom d'auteur</h4><p class='left-aligned'>SARRA-BOURNET, Michel. «Duplessis, Maurice Le Noblet», <em>Dictionnaire biographique du Canada</em>, [en ligne]. [http://www.biographi.ca] (28 février 2011).</p><h4>Sans nom d'auteur</h4><p class='left-aligned'>Wikipedia l'encyclopédie libre, «Isaac Newton», [en ligne]. [http://www.fr.wikipedia.org] (28 février 2011)</p><h3>Cédérom</h3><p>Éléments dans une référence bibliographique typique pour un cédérom : </p><ol><li>Nom de l'auteur ou de l'organisme en majuscule suivi d'une virgule et prénom en minuscule</li><li>Le titre du document en italique</li><li>Le type de support («[cédérom]»)</li><li>Lieu de publication</li><li>Nom de l'éditeur</li><li>Date de publication</li></ol><h4>Avec nom d'auteur</h4><p class='left-aligned'>VILLERS, Marie-Éva de. <em>Multidictionnaire de la langue française</em>, [cédérom], Montréal, Québec Amérique, 2001.</p><h4>Sans nom d'auteur</h4><p class='left-aligned'><em>Le Petit Robert : Dictionnaire de la langue française</em>, [cédérom], Paris, Le Robert, 2001.</p><h3>Documents audiovisuels</h3><p>Éléments dans une référence bibliographique typique pour un document audiovisuels : </p><ol><li>Nom de l'auteur ou du réalisateur en majuscule suivi d'une virgule et du prénom en minuscule</li><li>Le titre de l'épisode entre guillemets</li><li>Nom de l'émission ou titre du document en italique</li><li>Lieu de production</li><li>Producteur</li><li>Diffuseur</li><li>Durée</li><li>Date</li><li>Support entre crochets (CD musique, DVD, etc.)</li><li>Date de visionnement entre parenthèses (s'il y a lieu)</li></ol><p class='left-aligned'>BLAQUIÈRE, Denis. <em>Sans banque et sans regret</em>, Montréal, Argus films & Red canoe production, Radio-Canada, 55 min., 2008, (19 février 2010).</p><p class='left-aligned'>GUILLAUD, Jean-Louis et <em>al.</em>, «L'aggression», <em>Apocalypse, La 2<sup>ème</sup> Guerre mondiale</em>, Paris, CC&C Clarke Costelle et Cie, 320 min., 2010, [DVD].</p>"
        }, {
            id: 3,
            name: "Entrevue",
            text: "<p>Éléments dans une référence bibliographique typique pour une entrevue : </p><ol><li>Nom de l'élève</li><li>Nom de la personne rencontrée</li><li>Titre de la personne</li><li>Lieu</li><li>Date de l'entrevue</li></ol><p class='left-aligned'>BÉDARD, Sandrine. Entrevue avec M. Jacques Bédard, retraité et ancien combattant de la Deuxième Guerre mondiale, Saint-Bruno, le 12 juin 2010.</p>"
        }, {
            id: 4,
            name: "Appel de note et notes de bas de page",
            text: "<p>Pour indiquer les références bibliographique d'une citation, l'appel de note est signifié par un chiffre arabe en exposant d'un demi-interligne et sans parenthèse; ce chiffre d'appel se situe immédiatement après le mot ou le texte que l'on désire commente, après la ponctuation s'il y en a une.</p><ul><li>Au bas de la page, les références sont séparées du texte par un filet (trait plein) (application générale automatique sur traitement de texte).</li><li>Le chiffre d'appel est un exposant d'un demi-interligne au début de la référence et le texte suit immédiatement à simpel interligne.</li></ul><p>Les appels de note sont numérotés consécutivement du début à la fin du travail.</p>"
        }, {
            id: 5,
            name: "Abréviations courantes",
            text: "<p>Il arrive qu'une même source soit citée une deuxième fois ou plus; on emploie alors certaines abréviations qui permettent de ne pas réécrire la description bibliographique complète. Ce sont : </p><p class='padding-top'><strong>Ibid.</strong> est l'abréviation du latin <em>ibidem</em> qui signifie «au même endroit». Cette abréviation désigne l'ouvrage déjà identifié dans la référence précédente. On indique alors seulement l'abréviation <em>ibid.</em> et le numéro de la page correspondante.</p><p class='left-aligned'>Exemple : <em>Ibid.</em>, p. 23.</p><p class='padding-top'><strong>Op. cit.</strong> est l'abréviation du latin <em>Opere citato</em> qui signifie «oeuvre déjà citée». Cette abréviation, précédée du nom de l'auteur, désigne un ouvrage déjà identifié mais non consécutive.</p><p class='left-aligned'>Exemple : GREER, A., <em>op. cit.</em>, p. 37.</p><p class='padding-top'><strong>Loc. cit.</strong> est l'abréviation du latin «au lieu cité». Cette abréviation s'utilise comme l'<em>op. cit.</em>, mais lorsque qu'il s'agit d'articles de périodiques.</p><p class='left-aligned'>Exemple : TRUDEL, M., <em>op. cit.</em>, p. 35.</p>"
        }],
        icon: 'img/biblio.png',
        text: "<p>Un travail de recherche doit se faire à partir d'une documentation issue de sources fiables. De plus, toute citation (extrait repris textuellement), citation d'idée (résumé de la pensée d'un auteur) ou données, statistiques, etc. appelle une référence bibliographique qui contient dans l'ordre : </p><ul><li>son nom en majuscules suivi d'une virgule</li><li>le prénom de l'auteur en minuscule suivi d'un point</li><li>le titre souligné (manuscrit) ou en italique (traitement de texte)</li><li>l'adresse bibliographique : lieu de publication, nom de l'éditeur, année de publication suivi d'une virgule</li><li>la référence au volume ou au tome suivi d'une virgule</li><li>le nombre de pages</li></ul><p>Une note de bas de page est la référence bibliographique mentionnée au bas de la page où se trouve une citation. Cependant, on remplace le nombre de pages par le numéro de la page de l'ouvrage où la citation a été puisée, et on indique dans l'ordre suivant, le prénom et le nom de famille sans majuscule. Dans un travail de plusieurs pages comportant une bibliographie, il est possible d'utiliser la référence courte, soit l'auteur, le titre et la page.</p>",
        containsSub: true
    }, {
        id: 3,
        name: "Modèles de pages",
        description: 'Page de titre, table des matières, texte avec citations, annexe',
        subPages: [{
            id: 0,
            name: "Page de titre",
            text: ""
        }, {
            id: 1,
            name: "Table des matières",
            text: ""
        }, {
            id: 2,
            name: "Texte avec citations",
            text: ""
        }, {
            id: 3,
            name: "Annexe",
            text: ""
        }, {
            id: 4,
            name: "Bibliographie par ordre alphabétique",
            text: ""
        }, {
            id: 5,
            name: "Bibliographie par type de documents",
            text: ""
        }],
        icon: 'img/page-icon.png',
        text: "",
        containsSub: true,
        isPremium: true
    }];

    return {
        all: function() {
            return articles;
        },
        remove: function(article) {
            articles.splice(articles.indexOf(article), 1);
        },
        get: function(articleId) {
            for (var i = 0; i < articles.length; i++) {
                if (articles[i].id === parseInt(articleId)) {
                    return articles[i];
                }
            }
            return null;
        }
    };
});
