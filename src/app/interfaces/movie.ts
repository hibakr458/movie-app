export interface Movie {
    
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    title: string;
    original_language: string;
    original_title: string;     
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    softcore: boolean;
    video: boolean;
    vote_average: number;
    vote_count: number;


}//interface Movie qui est une interface qui définit la structure d'un objet Movie. 
//comme une classe abstraite, elle ne peut pas être instanciée directement, mais elle peut être utilisée pour typer des objets qui respectent cette structure.
