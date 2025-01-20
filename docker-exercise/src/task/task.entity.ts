import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Marca classe como uma entidade do banco
export class Task {
  @PrimaryGeneratedColumn() // Cria ID automático
  id: number;

  @Column() // Campo normal da tabela
  title: string;

  @Column({ default: false }) // Campo com valor padrão
  completed: boolean;
}
