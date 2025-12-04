export const updateAuthOverlayDisplayState = ({user, pageTitleElement, contentWrapperElement, overlayWrapperElement, formatGreeting}) =>
{
    const username = user.user_metadata?.username || 'User'

    if(user)
    {
        if(pageTitleElement && formatGreeting)
        {
            pageTitleElement.textContent = `${formatGreeting()}, ${username}`
        }

        // Show content and hide overlay
        contentWrapperElement.style.display = "block"
        overlayWrapperElement.style.display = "none"
    }
    else
    {
        contentWrapperElement.style.display = "none"
        overlayWrapperElement.style.display = "block"
    }
}