import { IPersona } from "src/persona/persona.model";
import { IRecursosCol } from "src/recursos-col/recursos-col.model";

export class RespuestasECrearDto{
    Institucion: string;
    Sede: string;
    Regional: string;
    Centro: string;
    Facultad: string;
    Programa: string;
    Persona:IPersona;
    Escalas: [];
    RecursosCol:[];
    Fecha: Date;
    
}