import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // O'zbek matnlarida apostrof keng ishlatiladi (o', g', ta'lim).
      // JSX ichida ularni har safar escape qilish kodni o'qishni qiyinlashtiradi.
      "react/no-unescaped-entities": "off",
      // Ilova client-side ma'lumot yuklashga asoslangan: effekt ichida
      // loading=true o'rnatish va localStorage'dan sozlamalarni tiklash —
      // atayin va to'g'ri pattern.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
