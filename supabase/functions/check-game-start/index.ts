import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

type Player = {
  id: string
  ready: boolean
}

serve(async (req) => {
  const { sessionId } = await req.json()
  
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  // Get all players and session in a single transaction
  const { data: session } = await supabase
    .from('sessions')
    .select(`
      id,
      game_mode,
      status,
      players (*)
    `)
    .eq('id', sessionId)
    .single()

  if (!session) {
    return new Response(
      JSON.stringify({ error: 'Session not found' }),
      { status: 404 }
    )
  }

  const players = session.players as Player[]
  
  if (players.length > 0 && players.every((player) => player.ready)) {
    // Update session status
    await supabase
      .from('sessions')
      .update({ status: 'in_progress' })
      .eq('id', sessionId)

    return new Response(
      JSON.stringify({ 
        status: 'started',
        game_mode: session.game_mode 
      }),
      { status: 200 }
    )
  }

  return new Response(
    JSON.stringify({ status: 'waiting' }),
    { status: 200 }
  )
}) 