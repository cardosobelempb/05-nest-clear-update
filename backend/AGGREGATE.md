# conceitos

- aggregate -> entidades manipuladas justas no CRUD
- watchedList -> uma lista observada

## Exemplo

- moment -> id, name, isActive, createdA, updatedAt
- moment -> user

- category -> id, name, isActive, createdA, updatedAt
- category -> user

- comment -> id, content, isActive, createdA, updatedAt
- comment -> user
- comment -> service

- service -> id, name, price, duration, isActive, createdA, updatedAt
- service -> user
- service -> category[]
- service -> comment[]

- appointmnet -> id, status, isActive, createdA, updatedAt
- appointment -> user
- appointment -> service
- appointment -> moment | period
