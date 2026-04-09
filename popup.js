document.addEventListener('DOMContentLoaded', async function () {
    
    // Elements
    const aiProviderSelect = document.getElementById('ai-provider');
    const customEndpointGroup = document.getElementById('custom-endpoint-group');
    const customEndpointInput = document.getElementById('custom-endpoint');
    const apiKeyInput = document.getElementById('api-key');
    const modelNameInput = document.getElementById('model-name');
    const saveBtn = document.getElementById('save-btn');
    const saveStatus = document.getElementById('save-status');

    // Toggle custom endpoint visibility
    function toggleEndpointVisibility() {
        if (aiProviderSelect.value === 'custom') {
            customEndpointGroup.style.display = 'flex';
        } else {
            customEndpointGroup.style.display = 'none';
        }
    }

    aiProviderSelect.addEventListener('change', toggleEndpointVisibility);

    // Load existing settings
    chrome.storage.local.get([
        'aiProvider',
        'customEndpoint',
        'customAPIKey',
        'customModelName'
    ], (result) => {
        if (result.aiProvider) aiProviderSelect.value = result.aiProvider;
        if (result.customEndpoint) customEndpointInput.value = result.customEndpoint;
        if (result.customAPIKey) apiKeyInput.value = result.customAPIKey;
        if (result.customModelName) modelNameInput.value = result.customModelName;
        
        toggleEndpointVisibility();
    });

    // Save settings
    saveBtn.addEventListener('click', () => {
        chrome.storage.local.set({
            useCustomAPI: true, // Always true now since we rely on custom keys
            aiProvider: aiProviderSelect.value,
            customEndpoint: customEndpointInput.value.trim(),
            customAPIKey: apiKeyInput.value.trim(),
            customModelName: modelNameInput.value.trim()
        }, () => {
            saveStatus.style.display = 'block';
            setTimeout(() => {
                saveStatus.style.display = 'none';
            }, 2000);
        });
    });


});
