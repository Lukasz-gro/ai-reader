import { useState } from 'react';
import styles from '../page.module.css';

interface Parameter {
  name: string;
  label: string;
  type: string;
  placeholder: string;
}

interface ParameterInputProps {
  parameters: Parameter[];
  onComplete: (values: Record<string, string>) => void;
  onCancel: () => void;
}

export default function ParameterInput({ parameters, onComplete, onCancel }: ParameterInputProps) {
  const [values, setValues] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(values);
  };

  const handleChange = (name: string, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.parameterPanel}>
      <form onSubmit={handleSubmit}>
        <div className={styles.parameterInputs}>
          {parameters.map((param) => (
            <div key={param.name} className={styles.parameterField}>
              <label htmlFor={param.name}>{param.label}</label>
              <input
                type={param.type}
                id={param.name}
                value={values[param.name] || ''}
                onChange={(e) => handleChange(param.name, e.target.value)}
                placeholder={param.placeholder}
                required
              />
            </div>
          ))}
        </div>
        <div className={styles.parameterActions}>
          <button type="button" onClick={onCancel} className={styles.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
} 