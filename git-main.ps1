# git-main.ps1
# Automatiza:
#
#   MI_RAMA -> main -> pull -> merge -> push -> MI_RAMA
#
# Uso:
#   .\git-main.ps1


# ============================================================
# CONFIGURACIÓN
# ============================================================

$MAIN_BRANCH = "main"
$REMOTE = "origin"


# ============================================================
# FUNCIONES AUXILIARES
# ============================================================

function Write-ErrorAndExit {
    param (
        [string]$Message
    )

    Write-Host ""
    Write-Host "ERROR: $Message" -ForegroundColor Red
    Write-Host ""

    exit 1
}


function Invoke-Git {
    param (
        [Parameter(Mandatory = $true)]
        [string[]]$Arguments,

        [string]$ErrorMessage = "El comando de Git falló."
    )

    & git @Arguments

    if ($LASTEXITCODE -ne 0) {
        Write-ErrorAndExit $ErrorMessage
    }
}


function Get-CurrentBranch {

    $branch = git branch --show-current

    if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($branch)) {
        Write-ErrorAndExit "No se pudo determinar la rama actual (¿estás en un 'detached HEAD'?)."
    }

    return $branch.Trim()
}


function Test-UncommittedChanges {

    $status = git status --porcelain

    if ($LASTEXITCODE -ne 0) {
        Write-ErrorAndExit "No se pudo comprobar el estado del repositorio."
    }

    return -not [string]::IsNullOrWhiteSpace($status)
}


function Show-Header {

    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "          GIT MAIN MANAGER" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
}


# ============================================================
# INICIO
# ============================================================

Show-Header


# ============================================================
# 1. COMPROBAR REPOSITORIO Y REMOTO
# ============================================================

git rev-parse --is-inside-work-tree *> $null

if ($LASTEXITCODE -ne 0) {
    Write-ErrorAndExit "No estás dentro de un repositorio Git."
}

git remote get-url $REMOTE *> $null

if ($LASTEXITCODE -ne 0) {
    Write-ErrorAndExit "No existe el remoto '$REMOTE'. Verificá tu configuración con 'git remote -v'."
}


# ============================================================
# 2. DETECTAR RAMA
# ============================================================

$MY_BRANCH = Get-CurrentBranch

Write-Host "Rama actual: " -NoNewline
Write-Host "$MY_BRANCH" -ForegroundColor Yellow


# ============================================================
# 3. PROTECCIONES
# ============================================================

if ($MY_BRANCH -eq $MAIN_BRANCH) {
    Write-ErrorAndExit "Estás en '$MAIN_BRANCH'. Este script debe ejecutarse desde tu rama personal."
}


# Comprobar si existe un merge en progreso

git rev-parse --verify MERGE_HEAD 2>$null

if ($LASTEXITCODE -eq 0) {
    Write-ErrorAndExit "Hay un merge en progreso. Resolvé el conflicto antes de utilizar este script."
}


# Comprobar que main existe

git show-ref --verify --quiet "refs/heads/$MAIN_BRANCH"

if ($LASTEXITCODE -ne 0) {
    Write-ErrorAndExit "La rama '$MAIN_BRANCH' no existe localmente."
}


# ============================================================
# 4. COMPROBAR CAMBIOS
# ============================================================

if (Test-UncommittedChanges) {

    Write-Host ""
    Write-Host "Tenés cambios sin guardar:" -ForegroundColor Yellow
    Write-Host ""

    git status

    Write-Host ""

    $answer = Read-Host "¿Querés crear un commit con estos cambios? (s/n)"

    if ($answer.ToLower() -ne "s") {
        Write-ErrorAndExit "Operación cancelada. No se creó ningún commit."
    }

    Write-Host ""
    $commitMessage = Read-Host "Mensaje del commit"

    if ([string]::IsNullOrWhiteSpace($commitMessage)) {
        Write-ErrorAndExit "El mensaje del commit no puede estar vacío."
    }

    Write-Host ""
    Write-Host "Agregando archivos..." -ForegroundColor Cyan

    Invoke-Git `
        -Arguments @("add", ".") `
        -ErrorMessage "No se pudieron agregar los archivos."

    Write-Host "Creando commit..." -ForegroundColor Cyan

    Invoke-Git `
        -Arguments @("commit", "-m", $commitMessage) `
        -ErrorMessage "No se pudo crear el commit."
}


# ============================================================
# 5. CAMBIAR A MAIN
# ============================================================

Write-Host ""
Write-Host "Cambiando a '$MAIN_BRANCH'..." -ForegroundColor Cyan

Invoke-Git `
    -Arguments @("switch", $MAIN_BRANCH) `
    -ErrorMessage "No se pudo cambiar a '$MAIN_BRANCH'."


# ============================================================
# 6. ACTUALIZAR MAIN
# ============================================================

Write-Host ""
Write-Host "Actualizando '$MAIN_BRANCH' desde $REMOTE..." -ForegroundColor Cyan

Invoke-Git `
    -Arguments @("pull", "--no-edit", $REMOTE, $MAIN_BRANCH) `
    -ErrorMessage "No se pudo actualizar '$MAIN_BRANCH'. No se realizará el merge."


# ============================================================
# 7. MERGE
# ============================================================

Write-Host ""
Write-Host "Fusionando '$MY_BRANCH' -> '$MAIN_BRANCH'..." -ForegroundColor Cyan

& git merge --no-edit $MY_BRANCH

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERROR: El merge falló, probablemente por conflictos." -ForegroundColor Red
    Write-Host "Quedaste ubicado en la rama '$MAIN_BRANCH' con el merge sin terminar." -ForegroundColor Yellow
    Write-Host "Resolvé los conflictos y hacé commit, o cancelá con:" -ForegroundColor Yellow
    Write-Host "    git merge --abort" -ForegroundColor Yellow
    Write-Host "y luego volvé a tu rama con:" -ForegroundColor Yellow
    Write-Host "    git switch $MY_BRANCH" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}


# ============================================================
# 8. PUSH
# ============================================================

Write-Host ""
Write-Host "Subiendo '$MAIN_BRANCH' a $REMOTE..." -ForegroundColor Cyan

& git push $REMOTE $MAIN_BRANCH

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERROR: El push falló. '$MAIN_BRANCH' no fue actualizado en el remoto." -ForegroundColor Red
    Write-Host "El merge local SÍ se realizó. Seguís en la rama '$MAIN_BRANCH'." -ForegroundColor Yellow
    Write-Host "Reintentá el push manualmente cuando resuelvas el problema:" -ForegroundColor Yellow
    Write-Host "    git push $REMOTE $MAIN_BRANCH" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}


# ============================================================
# 9. VOLVER A NUESTRA RAMA
# ============================================================

Write-Host ""
Write-Host "Volviendo a '$MY_BRANCH'..." -ForegroundColor Cyan

Invoke-Git `
    -Arguments @("switch", $MY_BRANCH) `
    -ErrorMessage "El push se realizó correctamente, pero no se pudo volver a '$MY_BRANCH'."


# ============================================================
# FIN
# ============================================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "          OPERACION COMPLETADA" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "$MY_BRANCH -> $MAIN_BRANCH -> $REMOTE/$MAIN_BRANCH" -ForegroundColor Green
Write-Host ""
