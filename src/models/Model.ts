import { ExcludeFromSave } from './decorator/decorators';

export class Model {
  @ExcludeFromSave()
  uid: string;

  constructor() {
    this.uid = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  hasID(): boolean {
    return (this.id !== undefined) && (this.id !== null);
  }

  toJSON(): Record<string, unknown> {
    const obj: Record<string, unknown> = {};
    const excludedFields: (string | symbol)[] =
      Reflect.getMetadata('excluded:fields', this) || [];

    for (const [key, value] of Object.entries(this)) {
      if (excludedFields.includes(key)) continue; // пропускаем поля, которые не нужно отправлять на сервер

      if (Array.isArray(value)) {
        obj[key] = value.map((v: unknown): unknown => {
          if (v instanceof Model) {
            return v.toJSON();
          }
          return v;
        });
      } else if (value instanceof Model) {
        obj[key] = value.toJSON();
      } else {
        obj[key] = value;
      }
    }

    return obj;
  }
}
