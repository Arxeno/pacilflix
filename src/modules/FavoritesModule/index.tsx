import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAuthContext } from '@/components/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Favorite } from './interface'
import { toast } from 'sonner'
import Link from 'next/link'

const FavoritesModule = () => {
  const [favorites, setFavorites] = useState<Favorite[] | null>(null)
  const { isAuthenticated, isLoading, customFetch } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    customFetch<Favorite[]>('/api/favorites/', {
      isAuthorized: true,
    }).then((response) => setFavorites(response.data))
  }, [])

  const handleDelete = async (timestamp: string) => {
    await customFetch<Favorite[]>('/api/favorites/', {
      isAuthorized: true,
      method: 'DELETE',
      body: JSON.stringify({
        timestamp: new Date(timestamp).toISOString().replace(/\.\d{3}Z$/, ''),
      }),
    }).then((response) => {
      setFavorites(response.data)
      toast(response.message)
    })
  }

  if (isLoading) {
    return (
      <main className="py-28 grid grid-cols-1 gap-y-15">
        <p className="text-center mx-auto ">Loading...</p>
      </main>
    )
  } else {
    return (
      <main className="py-28 grid grid-cols-1 gap-y-15">
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-5xl font-bold">Daftar Favorit</h1>
          <p>Semua film favorit Anda.</p>
          <p>Disatu tempat yang sama.</p>
        </div>
        <div className="container mx-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[33%]">Title</TableHead>
                <TableHead className="w-[33%]">Time added</TableHead>
                <TableHead className="w-[33%]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {favorites &&
                favorites.map((favorite) => {
                  return (
                    <TableRow
                      key={`${favorite.timestamp}===${favorite.username}`}
                    >
                      <TableCell>
                        <Link
                          href={`/favorites/${new Date(favorite.timestamp).toISOString().replace(/\.\d{3}Z$/, '')}`}
                        >
                          {favorite.judul}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {new Date(favorite.timestamp).toString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={async () =>
                            await handleDelete(favorite.timestamp)
                          }
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              {(!favorites || favorites.length === 0) && (
                <TableRow>
                  <TableCell colSpan={3}>No favorites added.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    )
  }
}

export default FavoritesModule
