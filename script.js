document.addEventListener('DOMContentLoaded', function() {
    const decimalInput = document.getElementById('decimal');
    const binaryInput = document.getElementById('binary');
    const convertBtn = document.getElementById('convertBtn');
    const resetBtn = document.getElementById('resetBtn');
    const swapBtn = document.getElementById('swapBtn');
    
    let isDecimalToBinary = true;
    
    // Convert decimal to binary
    function decimalToBinary(decimal) {
        return parseInt(decimal).toString(2);
    }
    
    // Convert binary to decimal
    function binaryToDecimal(binary) {
        return parseInt(binary, 2);
    }
    
    // Update conversion direction
    function updateConversionDirection() {
        isDecimalToBinary = !isDecimalToBinary;
        
        if (isDecimalToBinary) {
            document.querySelector('.title').textContent = 'Decimal → Binary';
            decimalInput.placeholder = 'Enter decimal number';
            binaryInput.placeholder = 'Binary result';
        } else {
            document.querySelector('.title').textContent = 'Binary → Decimal';
            decimalInput.placeholder = 'Enter binary number';
            binaryInput.placeholder = 'Decimal result';
        }
        
        // Clear inputs when switching
        decimalInput.value = '';
        binaryInput.value = '';
    }
    
    // Perform conversion
    function convert() {
        const inputValue = decimalInput.value.trim();
        
        if (!inputValue) {
            animateError(decimalInput);
            return;
        }
        
        try {
            let result;
            
            if (isDecimalToBinary) {
                if (isNaN(inputValue)) {
                    throw new Error('Please enter a valid decimal number');
                }
                result = decimalToBinary(inputValue);
            } else {
                // Validate binary input
                if (!/^[01]+$/.test(inputValue)) {
                    throw new Error('Please enter a valid binary number (0s and 1s only)');
                }
                result = binaryToDecimal(inputValue);
            }
            
            binaryInput.value = result;
            animateSuccess();
        } catch (error) {
            animateError(decimalInput);
            alert(error.message);
        }
    }
    
    // Reset inputs
    function reset() {
        decimalInput.value = '';
        binaryInput.value = '';
        animateReset();
    }
    
    // Animation functions
    function animateSuccess() {
        const convertBtn = document.querySelector('.convert-btn');
        convertBtn.textContent = 'Success!';
        convertBtn.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            convertBtn.textContent = 'Convert';
            convertBtn.style.backgroundColor = '';
        }, 1500);
    }
    
    function animateError(inputElement) {
        inputElement.style.borderColor = '#dc3545';
        inputElement.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.2)';
        inputElement.style.animation = 'shake 0.5s';
        
        setTimeout(() => {
            inputElement.style.borderColor = '';
            inputElement.style.boxShadow = '';
            inputElement.style.animation = '';
        }, 500);
    }
    
    function animateReset() {
        const resetBtn = document.querySelector('.reset-btn');
        resetBtn.textContent = 'Cleared!';
        resetBtn.style.backgroundColor = '#6c757d';
        
        setTimeout(() => {
            resetBtn.textContent = 'Reset';
            resetBtn.style.backgroundColor = '';
        }, 1500);
    }
    
    // Add shake animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    
    // Event listeners
    convertBtn.addEventListener('click', convert);
    resetBtn.addEventListener('click', reset);
    swapBtn.addEventListener('click', updateConversionDirection);
    
    // Allow Enter key to trigger conversion
    decimalInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            convert();
        }
    });
});