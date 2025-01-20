// src/books/tests/books.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from '../books/books.controller';
import { BooksService } from '../books/books.service';
import { CreateBookDto } from 'src/books/dto/create-book.dto';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a book', () => {
      const createBookDto: CreateBookDto = {
        title: 'Test Book',
        author: 'Test Author',
        price: 29.99,
      };

      const result = controller.create(createBookDto);

      expect(result).toEqual({
        id: expect.any(Number),
        ...createBookDto,
        createdAt: expect.any(Date),
      });
    });
  });
});
