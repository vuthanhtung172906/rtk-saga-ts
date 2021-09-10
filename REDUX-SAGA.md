# REDUX SAGA tutorial

## Glossary : giải thích thuật ngữ cốt lõi trong saga

## Effect

    Là một plain JS object chứa các instructions để Saga middleware thực thi gì.

    vd: call(myfunc, 'arg1', 'arg2')

## Task

    A task giống như 1 process chạy dưới background. Tao một task với fork function

            const task = yield fork (otherSaga, ...args)

## Blocking / Non-blocking call

    Blocking : vd yeild take(action) , yeild call(ApiFn, ...args) đợi outcomes of its cho đến khi câu lệnh tiếp theo được thực hiện

    Non-blocking : yeild put() , yeild fork() , yeild cancel(task )

## Watcher/Worker

    Đề câp cách tổ chức luồng điều khiển với 2 saga riêng biệt

                function* watcher() {
                    while (true) {
                        const action = yield take(ACTION)
                        yield fork(worker, action.payload)
                    }
                    }

                function* worker(payload) {
                    // ... do some stuff
                    }

## API Middleware

     * createSagaMiddleware(option) : tao ra mot saga middleware  va connect den redux store

    https://redux-saga.js.org/docs/api


    Saga là một function trả về Generator Object

[https://redux-saga.js.org/docs/api](https://redux-saga.js.org/docs/api)

## effect creator pho bien

        - effect là một js object chứa thông tin để saga middleware biết phải làm gì
        - effect creator: là một function trả về một effect. và nó không thực thi effect này. Người thực thi là saga middleware
