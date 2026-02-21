#!/bin/bash

# Скрипт для очистки истории Git от node_modules и dist
# ВНИМАНИЕ: Это изменит историю Git и потребует force push!

set -e

echo "⚠️  ВНИМАНИЕ: Этот скрипт изменит историю Git!"
echo "📋 Убедитесь, что у вас есть резервная копия!"
echo ""
read -p "Продолжить? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
  echo "❌ Отменено"
  exit 1
fi

echo "🧹 Начинаем очистку истории Git..."

# Проверяем наличие git-filter-repo
if command -v git-filter-repo &> /dev/null; then
  echo "✅ Используем git-filter-repo..."
  
  # Удаляем node_modules из истории
  echo "🗑️  Удаляем node_modules из истории..."
  git-filter-repo --invert-paths --path node_modules --path node_modules/ --force
  
  # Удаляем dist из истории
  echo "🗑️  Удаляем dist из истории..."
  git-filter-repo --invert-paths --path dist --path dist/ --force
  
  echo "✅ История очищена с помощью git-filter-repo"
else
  echo "⚠️  git-filter-repo не найден, используем git filter-branch..."
  echo "⚠️  Это может занять больше времени..."
  
  # Удаляем node_modules из истории
  echo "🗑️  Удаляем node_modules из истории..."
  git filter-branch --tree-filter 'rm -rf node_modules' --prune-empty -f HEAD
  
  # Удаляем dist из истории
  echo "🗑️  Удаляем dist из истории..."
  git filter-branch --tree-filter 'rm -rf dist' --prune-empty -f HEAD
  
  echo "✅ История очищена с помощью git filter-branch"
fi

# Очищаем ссылки
echo "🧹 Очищаем ссылки..."
git for-each-ref --format="%(refname)" refs/original/ | xargs -n 1 git update-ref -d 2>/dev/null || true

# Очищаем reflog
echo "🧹 Очищаем reflog..."
git reflog expire --expire=now --all

# Сжимаем репозиторий
echo "🗜️  Сжимаем репозиторий..."
git gc --prune=now --aggressive

echo ""
echo "✅ Очистка завершена!"
echo ""
echo "📊 Новый размер репозитория:"
du -sh .git

echo ""
echo "⚠️  ВАЖНО: Теперь нужно выполнить force push:"
echo "   git push --force origin main"
echo ""
echo "⚠️  ВНИМАНИЕ: Force push перезапишет историю на GitHub!"
echo "   Убедитесь, что никто другой не работает с репозиторием!"
