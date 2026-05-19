# 🔧 Устранение проблем с обновлением Vercel

## Проблема: Vercel подключен к GitHub, но код не обновляется

### ✅ Шаг 1: Проверьте настройки Git в Vercel

1. Откройте ваш проект в Vercel Dashboard
2. Перейдите в **Settings** → **Git**
3. Проверьте:
   - ✅ **Production Branch** должна быть `main` (не `master`)
   - ✅ **Automatic deployments from Git** должна быть включена
   - ✅ Репозиторий должен быть `Anatoliiyastrebov/Viktoria_Savaa`

### ✅ Шаг 2: Проверьте последний коммит в GitHub

Убедитесь, что последние изменения действительно в GitHub:
- Откройте https://github.com/Anatoliiyastrebov/Viktoria_Savaa
- Проверьте последний коммит в ветке `main`
- Убедитесь, что изменения там есть

### ✅ Шаг 3: Проверьте Deployments в Vercel

1. В Vercel Dashboard откройте вкладку **Deployments**
2. Проверьте:
   - Когда был последний деплой?
   - Какой коммит был задеплоен? (проверьте хеш коммита)
   - Соответствует ли он последнему коммиту в GitHub?

### ✅ Шаг 4: Запустите деплой вручную

Если автоматический деплой не сработал:

1. В Vercel Dashboard → **Deployments**
2. Нажмите **"Redeploy"** на последнем деплое
3. Или нажмите **"Create Deployment"** → выберите последний коммит из GitHub

### ✅ Шаг 5: Проверьте настройки проекта

1. В Vercel Dashboard → **Settings** → **General**
2. Проверьте:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
   - **Root Directory:** `./` (корень)

### ✅ Шаг 6: Проверьте логи деплоя

1. В Vercel Dashboard откройте последний деплой
2. Посмотрите логи сборки
3. Проверьте, нет ли ошибок

### ✅ Шаг 7: Отключите и снова подключите GitHub

Если ничего не помогает:

1. В Vercel Dashboard → **Settings** → **Git**
2. Нажмите **"Disconnect"** для репозитория
3. Подождите несколько секунд
4. Нажмите **"Connect Git Repository"**
5. Выберите `Anatoliiyastrebov/Viktoria_Savaa`
6. Подтвердите подключение

### ✅ Шаг 8: Проверьте webhook в GitHub

1. Откройте https://github.com/Anatoliiyastrebov/Viktoria_Savaa/settings/hooks
2. Проверьте, есть ли webhook от Vercel
3. Если нет - Vercel должен создать его автоматически при подключении

### 🧪 Тестовый деплой

Я только что создал тестовый коммит (обновление версии в package.json).

**Проверьте сейчас:**
1. Откройте Vercel Dashboard
2. Должен появиться новый деплой с коммитом "Обновление версии для теста деплоя на Vercel"
3. Если деплой не появился - выполните Шаг 4 (ручной деплой)

### 📋 Чек-лист для проверки

- [ ] Production Branch = `main`
- [ ] Automatic deployments включены
- [ ] Последний коммит в GitHub есть
- [ ] Последний деплой в Vercel соответствует последнему коммиту
- [ ] Нет ошибок в логах деплоя
- [ ] Webhook от Vercel есть в GitHub

### 🆘 Если ничего не помогает

1. Создайте новый проект в Vercel
2. Импортируйте тот же репозиторий
3. Настройте заново
4. Удалите старый проект

Или используйте Vercel CLI для ручного деплоя:
```bash
npm i -g vercel
vercel login
vercel --prod
```
