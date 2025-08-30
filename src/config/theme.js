// eCare Pharmacy Theme Configuration
// Based on logo colors: Green cross (#10b981), Blue bottle (#3b82f6/#1e40af), Red/Orange/Purple pills

export const theme = {
  colors: {
    // Primary colors from logo
    primary: '#10b981',      // Green cross - main brand color
    primaryDark: '#059669',  // Darker green
    primaryLight: '#34d399', // Lighter green
    
    secondary: '#3b82f6',    // Blue bottle
    secondaryDark: '#1e40af', // Darker blue
    secondaryLight: '#60a5fa', // Lighter blue
    
    // Accent colors from pills
    accent: {
      red: '#ef4444',
      orange: '#f59e0b', 
      purple: '#8b5cf6'
    },
    
    // Neutral colors
    white: '#ffffff',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    },
    
    // Semantic colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  },
  
  // Component-specific theme mappings
  components: {
    header: {
      background: '#1e40af', // Secondary dark blue
      text: '#ffffff'
    },
    footer: {
      background: '#1f2937', // Dark gray
      text: '#ffffff'
    },
    button: {
      primary: {
        background: '#10b981',
        hover: '#059669',
        text: '#ffffff'
      },
      secondary: {
        background: '#3b82f6',
        hover: '#1e40af', 
        text: '#ffffff'
      }
    },
    card: {
      background: '#ffffff',
      border: '#e5e7eb',
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    }
  }
};

// CSS Custom Properties for dynamic theming
export const generateCSSVariables = (customTheme = theme) => {
  return `
    :root {
      --color-primary: ${customTheme.colors.primary};
      --color-primary-dark: ${customTheme.colors.primaryDark};
      --color-primary-light: ${customTheme.colors.primaryLight};
      --color-secondary: ${customTheme.colors.secondary};
      --color-secondary-dark: ${customTheme.colors.secondaryDark};
      --color-secondary-light: ${customTheme.colors.secondaryLight};
      --color-accent-red: ${customTheme.colors.accent.red};
      --color-accent-orange: ${customTheme.colors.accent.orange};
      --color-accent-purple: ${customTheme.colors.accent.purple};
      --color-white: ${customTheme.colors.white};
      --color-success: ${customTheme.colors.success};
      --color-warning: ${customTheme.colors.warning};
      --color-error: ${customTheme.colors.error};
      --color-info: ${customTheme.colors.info};
    }
  `;
};