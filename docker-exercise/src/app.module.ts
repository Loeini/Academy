import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Configuração do TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres', // Tipo do banco de dados
      host: process.env.DATABASE_HOST, // Pega valor da variável de ambiente
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true, // Carrega entidades automaticamente
      synchronize: true, // Cria tabelas automaticamente (não use em produção!)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
