import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'

function readStoredValue<T>(key: string, initialValue: T): T {
  if (typeof window === 'undefined') {
    return initialValue
  }

  try {
    const storedValue = window.localStorage.getItem(key)

    return storedValue !== null
      ? (JSON.parse(storedValue) as T)
      : initialValue
  } catch {
    return initialValue
  }
}

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() =>
    readStoredValue(key, initialValue),
  )

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Continue working when browser storage is unavailable.
    }
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
