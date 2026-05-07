# Supabase Infrastructure

> _Clarity over complexity. Every policy exists for a reason. Every trigger serves a purpose._

---

## Security

**Principle: Least Privilege** — Grant only what is necessary. Nothing more.

### Row Level Security (RLS)

| Table      | Operation | Condition          | Intent                             |
| ---------- | --------- | ------------------ | ---------------------------------- |
| `profiles` | SELECT    | `is_public = true` | Public profiles are visible to all |
| `profiles` | UPDATE    | `auth.uid() = id`  | Owners manage their own data       |
| `profiles` | DELETE    | `auth.uid() = id`  | Owners manage their own data       |
| `echoes`   | SELECT    | `is_public = true` | Public echoes are visible to all   |
| `echoes`   | INSERT    | `auth.uid() = id`  | Owners manage their own data       |
| `echoes`   | UPDATE    | `auth.uid() = id`  | Owners manage their own data       |

---

## Automation

**Principle: Let the database handle what the database should handle.**

All tables automatically maintain `updated_at` on every insert and update. No manual tracking required.

### Trigger: `sync_user_profile`

Fires when a new user registers in `auth.users`. Propagates identity data downstream into `public.profiles` without manual intervention.

---

## Schema

```
auth.users
    └── public.profiles    (1:1, via sync_user_profile)
            └── public.echoes    (1:N)
```

---

## Migrations

**Rule: Never alter production schema directly. Always migrate.**

Migrations are version-controlled records of intent — they document _what_ changed and _why_.

```
supabase/migrations/
```

Managed via the Supabase CLI. Each migration is a deliberate, reversible, auditable step.

---

_Written once. Maintained with discipline._
