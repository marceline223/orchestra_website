/**
 * Декоратор, отвечающий за признак исключения из объекта для отправки на сервер.
 * Например, поле uid, нужное только на клиенте
 */
export function ExcludeFromSave(): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    const excluded = Reflect.getMetadata('excluded:fields', target) || [];
    Reflect.defineMetadata('excluded:fields', [...excluded, propertyKey], target);
  };
}
