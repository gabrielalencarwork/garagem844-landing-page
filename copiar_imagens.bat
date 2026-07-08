@echo off
title Copiador de Imagens - Garagem 844
echo =======================================================
echo Copiando as imagens do Hero, Servicos e Galeria para assets...
echo =======================================================
echo.

:: Garantir que a pasta assets existe
if not exist "assets" (
    mkdir "assets"
    echo Pasta assets criada.
)

:: Copiar imagens
echo [1/8] Copiando Car Wash Hero...
copy "C:\Users\User\.gemini\antigravity-ide\brain\5a9c8a5a-7cad-43b1-85e5-91859b8f7b6d\car_wash_hero_1783542725091.png" "assets\car_wash_hero.png" /Y

echo [2/8] Copiando Event Space Hero...
copy "C:\Users\User\.gemini\antigravity-ide\brain\5a9c8a5a-7cad-43b1-85e5-91859b8f7b6d\event_space_hero_1783542744343.png" "assets\event_space_hero.png" /Y

echo [3/8] Copiando Imagem Servico - Estetica...
copy "C:\Users\User\.gemini\antigravity-ide\brain\5a9c8a5a-7cad-43b1-85e5-91859b8f7b6d\service_estetica_1783546830997.png" "assets\service_estetica.png" /Y

echo [4/8] Copiando Imagem Servico - Estacionamento...
copy "C:\Users\User\.gemini\antigravity-ide\brain\5a9c8a5a-7cad-43b1-85e5-91859b8f7b6d\service_estacionamento_1783546864479.png" "assets\service_estacionamento.png" /Y

echo [5/8] Copiando Galeria - Aniversario...
copy "C:\Users\User\.gemini\antigravity-ide\brain\5a9c8a5a-7cad-43b1-85e5-91859b8f7b6d\event_gallery_birthday_1783544530081.png" "assets\event_gallery_birthday.png" /Y

echo [6/8] Copiando Galeria - Casamento...
copy "C:\Users\User\.gemini\antigravity-ide\brain\5a9c8a5a-7cad-43b1-85e5-91859b8f7b6d\event_gallery_wedding_1783544557900.png" "assets\event_gallery_wedding.png" /Y

echo [7/8] Copiando Galeria - Corporativo...
copy "C:\Users\User\.gemini\antigravity-ide\brain\5a9c8a5a-7cad-43b1-85e5-91859b8f7b6d\event_gallery_corporate_1783544584761.png" "assets\event_gallery_corporate.png" /Y

echo [8/8] Copiando Galeria - Coquetel...
copy "C:\Users\User\.gemini\antigravity-ide\brain\5a9c8a5a-7cad-43b1-85e5-91859b8f7b6d\event_gallery_cocktail_1783544612074.png" "assets\event_gallery_cocktail.png" /Y

echo.
echo =======================================================
echo Processo concluido! Todas as 8 imagens foram copiadas.
echo =======================================================
echo.
pause
