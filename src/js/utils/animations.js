export function openDialog(id)
{
    const dialog = document.getElementById(id)

    setTimeout(() => {
    dialog?.classList.add('animate-[dialogIn_200ms_ease-out_forwards]')  
    }, 80)
}

export function closeDialog(id)
{
    const dialog = document.getElementById(id)

    if(dialog)
    {
        dialog.classList.remove('animate-[dialogIn_200ms_ease-out_forwards]')
        dialog.classList.add("animate-[dialogPopOut_150ms_ease-in_forwards]")


        dialog.addEventListener('animationend', () => dialog.close(), {once: true})
    }

}