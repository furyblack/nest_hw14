import { INestApplication } from '@nestjs/common';
import { DomainHttpExceptionsFilter } from '../core/exceptions/filters/domain-exceptions-filter';
import { AllHttpExceptionsFilter } from '../core/exceptions/filters/all-exceptions-filter';

export function exceptionFilterSetup(app: INestApplication) {
  //Подключаем наши фильтры. Тут важна последовательность! (сработает справа на лево)
  app.useGlobalFilters(
    new DomainHttpExceptionsFilter(),
    new AllHttpExceptionsFilter(),
  );
}
