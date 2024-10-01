import "reflect-metadata";
import { DataSource } from "typeorm";  
import { Activo, Departamento, ControlActivo } from "./entity/indexEntity";  
import express, { Request, Response } from "express";  

export {
    Activo,
    Departamento,
    ControlActivo,
    express,
    Request,
    Response,
    DataSource
};
